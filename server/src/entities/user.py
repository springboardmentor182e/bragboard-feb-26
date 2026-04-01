from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.core import Base

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}  # Add this to prevent errors

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String)

    # Password fields (donon versions se combine kiya)
    hashed_password = Column(String, nullable=False)  # For auth
    password = Column(String, nullable=False)  # For simple storage

    # Status flags
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    role = Column(String, default="user")  # 'admin', 'manager', 'user'
    status = Column(String, default="active")  # 'active', 'inactive', 'suspended'

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Profile fields
    avatar_url = Column(String, nullable=True)
    department = Column(String, nullable=True)
    position = Column(String, nullable=True)

    # Relationships
    contributions = relationship("UserContribution", back_populates="user", uselist=False)