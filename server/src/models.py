from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


# =========================
# USER TABLE
# =========================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    department = Column(String, nullable=False)
    points = Column(Integer, default=0)
    photo_url = Column(String, nullable=True)

    # One-to-Many Relationship
    shoutouts_received = relationship(
        "Shoutout",
        back_populates="receiver",
        cascade="all, delete"
    )


# =========================
# SHOUTOUT TABLE
# =========================
class Shoutout(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    points = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    receiver_id = Column(Integer, ForeignKey("users.id"))

    # Many-to-One Relationship
    receiver = relationship(
        "User",
        back_populates="shoutouts_received"
    )