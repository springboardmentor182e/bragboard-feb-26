from sqlalchemy import Column, Integer, String
from src.database.core import Base

class Shoutout(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)
    sender = Column(String)
    message = Column(String)
    department = Column(String)
    date = Column(String)