from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from ..database.core import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    department = Column(String)

    role = Column(String)

    status = Column(String)

    # 🔐 PASSWORD RESET FIELDS
    password_reset_otp = Column(String, nullable=True)

    password_reset_expires = Column(DateTime, nullable=True)