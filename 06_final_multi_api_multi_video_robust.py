"""
Stage 6: FINAL VERSION - Everything Combined
- Multiple API keys with rotation
- Multiple video IDs
- Exception handling for network errors
- Video titles displayed

This is the final production-ready version that combines
all the skills learned from Stage 1 to Stage 5.

Features:
1. API key rotation to avoid rate limits
2. Track multiple videos at once
3. Handles network errors gracefully
4. Shows video title (first 4 words)
5. Shows view count with commas
6. Shows gain/loss since last check
"""

import time
import requests
import locale

# Set locale for comma formatting (1000000 -> 1,000,000)
locale.setlocale(locale.LC_ALL, 'en_US')

# Multiple API keys - rotate between them to avoid rate limits
API_KEYS = os.getenv('YOUTUBE_API_KEYS', '').split(',')
if not API_KEYS or API_KEYS == ['']:
    print("WARNING: No YOUTUBE_API_KEYS found in environment variables!")
    API_KEYS = ['REPLACE_ME_WITH_REAL_KEY']


# List of video IDs to track
VIDEO_IDS = [
    'VuG7ge_8I2Y',
    'YxWlaYCA8MU',
    'jZGpkLElSu8',
    'sAzlWScHTc4',
    'G7KNmW9a75Y',
    '87JIOAX3njM',
]

# Create a buffer for API key rotation
# Works like a queue: pop from front, push to back
api_key_buffer = API_KEYS.copy()

# Dictionary to store last view count for each video
last_view_counts = {}


def get_video_statistics(api_key, video_id):
    """
    Fetch video info from YouTube API.
    
    This function combines all improvements:
    - Takes api_key as parameter for rotation
    - Returns None on any error (doesn't crash)
    - Handles network errors with try-except
    """
    url = f'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id={video_id}&key={api_key}'
    
    try:
        # Try to make the API request
        response = requests.get(url, headers={'Accept': 'application/json'})
        
        if response.status_code == 200:
            data = response.json()
            if 'items' in data and data['items']:
                return data['items'][0]
            else:
                print(f"No data found for Video ID: {video_id}")
                return None
        else:
            print(f"Error fetching data for Video ID: {video_id}, Status Code: {response.status_code}")
            return None
            
    except requests.exceptions.RequestException:
        # Network error - return None, don't crash
        return None


# ==================== MAIN CODE ====================

# Get initial stats for all videos
for video_id in VIDEO_IDS:
    # Rotate API key
    api_key = api_key_buffer.pop(0)
    api_key_buffer.append(api_key)
    
    video_info = get_video_statistics(api_key, video_id)
    
    if video_info:
        # Extract view count
        view_count = int(video_info['statistics']['viewCount'])
        
        # Extract and format title (first 4 words + ...)
        title = video_info['snippet']['title']
        if len(title.split()) > 4:
            formatted_title = ' '.join(title.split()[:4]) + '...'
        else:
            formatted_title = title
        
        # Format view count with commas
        formatted_view_count = locale.format_string("%d", view_count, grouping=True)
        
        # Get current time
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        
        # Print initial stats
        print(f"{current_time} | {formatted_title} | Current Views: {formatted_view_count} | Views Gain/Loss: +0")
        
        # Remember this view count
        last_view_counts[video_id] = view_count
    else:
        last_view_counts[video_id] = None

# Keep checking views forever
while True:
    for video_id in VIDEO_IDS:
        # Rotate API key for each request
        api_key = api_key_buffer.pop(0)
        api_key_buffer.append(api_key)
        
        video_info = get_video_statistics(api_key, video_id)
        
        if video_info:
            # Get current view count
            view_count = int(video_info['statistics']['viewCount'])
            
            # Get last view count for this video
            last_view_count = last_view_counts[video_id]
            
            # Only print if views changed
            if last_view_count is None or view_count != last_view_count:
                if last_view_count is not None:
                    # Extract and format title
                    title = video_info['snippet']['title']
                    if len(title.split()) > 4:
                        formatted_title = ' '.join(title.split()[:4]) + '...'
                    else:
                        formatted_title = title
                    
                    # Calculate gain/loss
                    views_gain_loss = view_count - last_view_count
                    
                    # Format numbers
                    formatted_gain_loss = locale.format_string("%+d", views_gain_loss, grouping=True)
                    formatted_view_count = locale.format_string("%d", view_count, grouping=True)
                    
                    # Get current time
                    current_time = time.strftime('%Y-%m-%d %H:%M:%S')
                    
                    # Print update
                    print(f"{current_time} | {formatted_title} | Current Views: {formatted_view_count} | Views Gain/Loss: {formatted_gain_loss}")
                
                # Remember this view count
                last_view_counts[video_id] = view_count
        else:
            # When API fails, print error message
            current_time = time.strftime('%Y-%m-%d %H:%M:%S')
            print(f"{current_time} | Video ID: {video_id} | Video statistics not available.")
    
    # Wait 1 minute before checking again
    time.sleep(60)
