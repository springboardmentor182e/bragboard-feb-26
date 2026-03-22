from sqlalchemy import Column, Integer, String
from src.database import Base

class Shoutout(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True)
    message = Column(String)
    sender = Column(String)
    receiver = Column(String)