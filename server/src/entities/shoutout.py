from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database.core import Base


class Shoutout(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)

    sender_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    receiver_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    message = Column(String)
    category = Column(String)
    points = Column(Integer, default=0)

    status = Column(String, default="PENDING")  # APPROVED / REJECTED / ARCHIVED
    
    # Soft delete & archive tracking
    is_deleted = Column(Boolean, default=False)
    deleted_at = Column(DateTime, nullable=True)
    is_archived = Column(Boolean, default=False)
    archived_at = Column(DateTime, nullable=True)
    
    # Edit tracking
    is_edited = Column(Boolean, default=False)
    edited_at = Column(DateTime, nullable=True)
    
    # Track updates
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    sender = relationship("User", foreign_keys=[sender_id])
    receiver = relationship("User", foreign_keys=[receiver_id])
    recipients = relationship("ShoutOutRecipient", back_populates="shoutout", cascade="all, delete-orphan")
    reactions = relationship("Reaction", back_populates="shoutout", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="shoutout", cascade="all, delete-orphan")