from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Index
from sqlalchemy.orm import relationship
import datetime
from app.database.database import Base

class Video(Base):
    __tablename__ = "videos"

    video_id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=True)
    thumbnail = Column(String, nullable=True)
    current_views = Column(Integer, default=0)
    last_update = Column(DateTime, default=datetime.datetime.utcnow)
    
    history_records = relationship("History", back_populates="video", order_by="desc(History.timestamp)", cascade="all, delete")


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    video_id = Column(String, ForeignKey("videos.video_id"), index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    views = Column(Integer)
    gain_loss = Column(Integer)

    video = relationship("Video", back_populates="history_records")

# Create composite index to speed up daily/yesterday queries
Index('idx_history_video_time', History.video_id, History.timestamp)
