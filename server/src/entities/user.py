from sqlalchemy import Column, Integer, String, Enum, Boolean
import enum
from database.base import Base
class RoleEnum(str, enum.Enum):
    employee = "employee"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    department = Column(String, index=True)
    role = Column(Enum(RoleEnum), default="employee")
    is_active = Column(Boolean, default=True)
