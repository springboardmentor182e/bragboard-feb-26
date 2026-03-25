from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float, Boolean, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()


class UserDB(Base):
    """User/Team Member database model"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)
    role = Column(String(255), nullable=False)
    department = Column(String(255), index=True, nullable=False)
    avatar = Column(String(500), nullable=True)
    shout_outs = Column(Integer, default=0)
    claps = Column(Integer, default=0)
    stars = Column(Integer, default=0)
    points = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    sent_shoutouts = relationship("ShoutoutDB", foreign_keys="ShoutoutDB.sender_id", back_populates="sender")


class BadgeDB(Base):
    """Badge database model"""
    __tablename__ = "badges"
    
    id = Column(Integer, primary_key=True, index=True)
    emoji = Column(String(10), nullable=False)
    name = Column(String(255), index=True, nullable=False)
    description = Column(Text, nullable=True)
    awarded = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    shoutouts = relationship("ShoutoutDB", back_populates="badge")


class ShoutoutDB(Base):
    """Shoutout database model"""
    __tablename__ = "shoutouts"
    
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    recipient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    badge_id = Column(Integer, ForeignKey("badges.id"), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Reaction fields
    heart_reactions = Column(Integer, default=0)
    thumbs_up_reactions = Column(Integer, default=0)
    star_reactions = Column(Integer, default=0)
    comment_reactions = Column(Integer, default=0)
    
    # Relationships
    sender = relationship("UserDB", foreign_keys=[sender_id], back_populates="sent_shoutouts")
    recipient = relationship("UserDB", foreign_keys=[recipient_id])
    badge = relationship("BadgeDB", back_populates="shoutouts")
    comments = relationship("CommentDB", back_populates="shoutout", cascade="all, delete-orphan")


class CommentDB(Base):
    """Comment database model"""
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True, index=True)
    shoutout_id = Column(Integer, ForeignKey("shoutouts.id"), nullable=False, index=True)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    shoutout = relationship("ShoutoutDB", back_populates="comments")
    author = relationship("UserDB")


class UserReactionDB(Base):
    """Track per-user reactions to shoutouts for toggle functionality"""
    __tablename__ = "user_reactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    shoutout_id = Column(Integer, ForeignKey("shoutouts.id"), nullable=False, index=True)
    reaction_type = Column(String(50), nullable=False)  # heart, thumbs_up, star
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Unique constraint: one user can only have one reaction type per shoutout
    __table_args__ = (UniqueConstraint('user_id', 'shoutout_id', 'reaction_type', name='uq_user_reaction'),)


class NotificationDB(Base):
    """Notification database model"""
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    text = Column(Text, nullable=False)
    read = Column(Boolean, default=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class ActivityDB(Base):
    """Activity/Recent Activity database model"""
    __tablename__ = "activities"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class CampaignDB(Base):
    """Campaign database model"""
    __tablename__ = "campaigns"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    progress = Column(Integer, default=0)  # 0-100
    participants = Column(Integer, default=0)
    ends_in_days = Column(Integer, nullable=False)
    icon = Column(String(10), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
