from sqlalchemy import Column, Integer, String
from database.db import Base
from src.database.core import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    password = Column(String)
    name = Column(String)
    department = Column(String)
    points = Column(Integer)
    badges = Column(Integer)
    trend = Column(String)
