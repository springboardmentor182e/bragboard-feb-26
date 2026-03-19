from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.core import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    # Basic info
    full_name = Column(String, nullable=False)
    department = Column(String)
    points = Column(Integer, default=0)
    photo_url = Column(String)

    # Auth fields
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    # Status
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    role = Column(String, default="user")
    status = Column(String, default="active")

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Profile
    avatar_url = Column(String, nullable=True)
    position = Column(String, nullable=True)

    # Relations
    contributions = relationship(
        "UserContribution",
        back_populates="user",
        uselist=False
    )