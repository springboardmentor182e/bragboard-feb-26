from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.core import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)  # Important for admin!
    role = Column(String, default="user")  # 'admin', 'manager', 'user'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Profile fields
    avatar_url = Column(String, nullable=True)
    department = Column(String, nullable=True)
    position = Column(String, nullable=True)
    contributions = relationship("UserContribution", back_populates="user", uselist=False)
from sqlalchemy import Column, Integer, String
from src.database.core import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    department = Column(String)

    role = Column(String)

    status = Column(String)
