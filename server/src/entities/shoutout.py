from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column
from src.database.core import Base


class Shoutout(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)

    # Your teammate A's fields
    sender_name = Column(String(120), nullable=True)
    receiver_name = Column(String(120), nullable=True)
    badge = Column(String(80), nullable=True)
    campaign = Column(String(120), nullable=True)
    message = Column(Text, nullable=True)
    level = Column(Integer, default=1)
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    shares = Column(Integer, default=0)

    # Your teammate B's fields
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    category = Column(String, nullable=True)
    points = Column(Integer, default=0)
    status = Column(String, default="PENDING")

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    sender = relationship("User", foreign_keys=[sender_id])
    receiver = relationship("User", foreign_keys=[receiver_id])