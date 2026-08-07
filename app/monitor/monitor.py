import asyncio
import requests
import datetime
import logging
import os
from dotenv import load_dotenv

load_dotenv()
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.models.models import Video, History

logger = logging.getLogger(__name__)

# Keys from original script
# Keys are loaded from .env file for security
API_KEYS = os.getenv('YOUTUBE_API_KEYS', '').split(',')
# If no keys were found in environment, provide a warning
if not API_KEYS or API_KEYS == ['']:
    logger.warning("No YOUTUBE_API_KEYS found in environment variables!")
    API_KEYS = ['REPLACE_ME_WITH_REAL_KEY']


# Videos from original script
VIDEO_IDS = [
    'VuG7ge_8I2Y',
    'YxWlaYCA8MU',
    'jZGpkLElSu8',
    'sAzlWScHTc4',
    'G7KNmW9a75Y',
    '87JIOAX3njM',
]

class YoutubeMonitor:
    def __init__(self):
        self.api_key_buffer = API_KEYS.copy()
        
    def get_video_statistics(self, api_key: str, video_id: str):
        url = f'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id={video_id}&key={api_key}'
        try:
            response = requests.get(url, headers={'Accept': 'application/json'}, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if 'items' in data and data['items']:
                    return data['items'][0]
                else:
                    logger.warning(f"No data found for Video ID: {video_id}")
                    return None
            else:
                logger.warning(f"Error fetching data for Video ID: {video_id}, Status Code: {response.status_code}")
                return None
        except requests.exceptions.RequestException as e:
            logger.error(f"Network error fetching video {video_id}: {e}")
            return None

    def process_video_stats(self, db: Session, video_id: str, video_info: dict):
        current_time = datetime.datetime.utcnow()
        try:
            view_count = int(video_info['statistics']['viewCount'])
            title = video_info['snippet']['title']
            
            # Get high res thumbnail if possible, else standard, else default
            thumbnails = video_info['snippet'].get('thumbnails', {})
            thumbnail_url = thumbnails.get('high', thumbnails.get('standard', thumbnails.get('default', {}))).get('url', '')

            # Calculate gain/loss by fetching last known state from DB
            db_video = db.query(Video).filter(Video.video_id == video_id).first()
            
            if db_video:
                last_view_count = db_video.current_views
                
                # Only insert to history if views changed
                if view_count != last_view_count:
                    views_gain_loss = view_count - last_view_count
                    
                    # Update video
                    db_video.current_views = view_count
                    db_video.title = title
                    db_video.thumbnail = thumbnail_url
                    db_video.last_update = current_time
                    
                    # Create history record
                    history = History(
                        video_id=video_id,
                        timestamp=current_time,
                        views=view_count,
                        gain_loss=views_gain_loss
                    )
                    db.add(history)
                    logger.info(f"Updated {title}: {view_count} ({views_gain_loss:+})")
            else:
                # First time seeing this video
                new_video = Video(
                    video_id=video_id,
                    title=title,
                    thumbnail=thumbnail_url,
                    current_views=view_count,
                    last_update=current_time
                )
                db.add(new_video)
                
                # First run gain is typically tracked as 0
                history = History(
                    video_id=video_id,
                    timestamp=current_time,
                    views=view_count,
                    gain_loss=0
                )
                db.add(history)
                logger.info(f"Initialized {title}: {view_count}")
                
            db.commit()
            
        except (KeyError, ValueError) as e:
            logger.error(f"Error parsing data for video {video_id}: {e}")
            
    async def monitor_loop(self):
        logger.info("Starting background YouTube monitor loop.")
        while True:
            try:
                with SessionLocal() as db:
                    for video_id in VIDEO_IDS:
                        # Rotate key
                        api_key = self.api_key_buffer.pop(0)
                        self.api_key_buffer.append(api_key)
                        
                        video_info = self.get_video_statistics(api_key, video_id)
                        
                        if video_info:
                            self.process_video_stats(db, video_id, video_info)
                        
                        # Sleep slightly between requests to distribute load
                        await asyncio.sleep(0.5)
            except Exception as e:
                logger.error(f"Critical error in DB loop: {e}")
                
            # Wait 60 seconds before checking again, identical to original script
            await asyncio.sleep(60)

monitor_service = YoutubeMonitor()
