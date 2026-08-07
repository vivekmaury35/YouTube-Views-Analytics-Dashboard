from pydantic import BaseModel
from typing import List, Optional
import datetime

class VideoBase(BaseModel):
    video_id: str
    title: Optional[str] = None
    thumbnail: Optional[str] = None
    current_views: int = 0
    last_update: datetime.datetime

class Video(VideoBase):
    class Config:
        orm_mode = True
        from_attributes = True

class HistoryBase(BaseModel):
    timestamp: datetime.datetime
    views: int
    gain_loss: int

class History(HistoryBase):
    id: int
    video_id: str
    
    class Config:
        orm_mode = True
        from_attributes = True

class VideoWithHistory(Video):
    history_records: List[History] = []
