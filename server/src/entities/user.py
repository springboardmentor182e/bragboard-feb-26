from sqlalchemy import Column, Integer, String
from src.database.core import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    department = Column(String)
    points = Column(Integer, default=0)
    photo_url = Column(String)