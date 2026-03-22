from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.orm import relationship
from ..database.core import Base
from .comment import CommentEntity

class ShoutoutEntity(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)
    author = Column(String)
    recipient = Column(String)
    department = Column(String)
    message = Column(String)
    badge = Column(JSON)      # Stores {"label": "..."}
    reactions = Column(JSON)  # Stores {"hearts": 38, ...}
    status = Column(String)
    date = Column(String)

    comments = relationship("CommentEntity", back_populates=None, cascade="all, delete-orphan")
