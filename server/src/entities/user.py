from sqlalchemy import Column, Integer, String
from src.database.core import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    score = Column(Integer)
    last_month_score = Column(Integer, default=0)