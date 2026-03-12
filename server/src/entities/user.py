from sqlalchemy import Column, Integer, String
from src.database.core import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    department = Column(String)
    points = Column(Integer)
    badges = Column(Integer)
    trend = Column(String)