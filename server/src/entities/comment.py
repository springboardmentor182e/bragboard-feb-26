from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from ..database.core import Base

class CommentEntity(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    shoutout_id = Column(Integer, ForeignKey("shoutouts.id"), nullable=False)
    # In a real app, this would link to a users table
    author = Column(String, nullable=False) 
