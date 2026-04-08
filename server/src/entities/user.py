from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from src.database.core import Base


class User(Base):
    __tablename__ = "users"

    # ==============================
    # Primary Key
    # ==============================
    id = Column(Integer, primary_key=True, index=True)

    # ==============================
    # Basic Info
    # ==============================
    full_name = Column(String, nullable=False)
    department = Column(String, nullable=False)
    points = Column(Integer, default=0, nullable=False)
    photo_url = Column(String, nullable=True)

    # ==============================
    # Auth Fields
    # ==============================
    email = Column(String, unique=True, index=True, nullable=True)
    username = Column(String, unique=True, index=True, nullable=True)
    password = Column(String, nullable=True)

    # ==============================
    # Badges                          ✅ ADD THIS BLOCK
    # ==============================
    fire_badges = Column(Integer, default=0, nullable=False)
    star_badges = Column(Integer, default=0, nullable=False)
    thumb_badges = Column(Integer, default=0, nullable=False)

    # ==============================
    # Status
    # ==============================
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    role = Column(String, default="user")
    status = Column(String, default="active")

    # ==============================
    # Timestamps
    # ==============================
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())