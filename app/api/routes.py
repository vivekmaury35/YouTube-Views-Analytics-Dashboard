from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
import datetime

from app.database.database import get_db
from app.models.models import Video, History
from app.schemas.schemas import Video as VideoSchema, History as HistorySchema

router = APIRouter()

@router.get("/songs", response_model=List[VideoSchema])
def get_songs(db: Session = Depends(get_db)):
    """Returns all monitored videos with current states"""
    videos = db.query(Video).all()
    return videos

@router.get("/songs/{video_id}", response_model=VideoSchema)
def get_song_details(video_id: str, db: Session = Depends(get_db)):
    """Returns details of a specific video"""
    video = db.query(Video).filter(Video.video_id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    return video

@router.get("/songs/{video_id}/history", response_model=List[HistorySchema])
def get_song_history(
    video_id: str,
    filter: Optional[str] = Query(None, description="Filter: 'today' or 'yesterday'"),
    tz: Optional[str] = Query(None, description="Client timezone string"),
    db: Session = Depends(get_db)
):

    print("--- DIRECTORY PROOF BLOCK ---")
    import sys
    import os
    print(f"os.getcwd(): {os.getcwd()}")
    print(f"routes __file__: {__file__}")
    from app import main as main_app
    print(f"app.main.__file__: {main_app.__file__}")
    from app.database import database as db_module
    print(f"database.__file__: {db_module.__file__}")
    print(f"engine.url: {str(db.get_bind().url)}")
    
    # Check if the sqlite file is mapped relatively or absolute by executing a PRAGMA
    try:
        abs_path = os.path.abspath("./yt_analyzer.db")
        print(f"absolute sqlite database path (expected): {abs_path}")
    except Exception as e:
        print(f"Absolute path resolution failed: {e}")
        
    print("--- END DIRECTORY PROOF ---")
    print("
=======================================================")
    print("REQUEST RECEIVED")
    print(f"filter: {filter}")
    print(f"tz: {tz}")
    print(f"video_id: {video_id}")
    
    now_utc = datetime.datetime.utcnow()
    use_tz = tz if tz else str(get_localzone())
    
    try:
        user_tz = pytz.timezone(use_tz)
    except Exception:
        user_tz = get_localzone()
        
    now_local = datetime.datetime.now(user_tz)
    
    print(f"current local datetime: {now_local}")
    print(f"current utc datetime: {now_utc}")
    
    utc_start_today = get_utc_boundary_from_local(0)
    utc_start_yesterday = get_utc_boundary_from_local(-1)
    
    print(f"calculated today boundary: {utc_start_today}")
    print(f"calculated yesterday boundary: {utc_start_yesterday}")

    query = db.query(History).filter(History.video_id == video_id)

    if filter:
        if filter.lower() == "today":
            query = query.filter(History.timestamp >= utc_start_today)
        elif filter.lower() == "yesterday":
            query = query.filter(History.timestamp >= utc_start_yesterday, History.timestamp < utc_start_today)
            
    compiled_sql = str(query.statement.compile(compile_kwargs={"literal_binds": True}))
    print(f"compiled SQL: {compiled_sql}")
    
    history = query.order_by(desc(History.timestamp)).all()
    print(f"rows returned: {len(history)}")
    
    if len(history) > 0:
        print(f"oldest timestamp: {history[-1].timestamp}")
        print(f"newest timestamp: {history[0].timestamp}")
    else:
        print("oldest timestamp: None")
        print("newest timestamp: None")
        
    print(f"response length: {len(history)}")
    print("=======================================================
")
    return history
