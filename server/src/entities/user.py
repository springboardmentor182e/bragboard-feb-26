from sqlalchemy import Column, Integer, String, Enum, Boolean, DateTime
from sqlalchemy.sql import func
import enum

from src.database.core import Base


class RoleEnum(str, enum.Enum):
    employee = "employee"
    admin = "admin"


class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)

    password = Column(String, nullable=False)

    department = Column(String, index=True)

    role = Column(Enum(RoleEnum), default=RoleEnum.employee)

    is_active = Column(Boolean, default=True)

    joined_at = Column(DateTime(timezone=True), server_default=func.now())