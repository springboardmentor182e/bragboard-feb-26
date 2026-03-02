from sqlalchemy import Column, Integer, ForeignKey, String
from database.core import Base

class Reaction(Base):
    __tablename__ = "reactions"

    id = Column(Integer, primary_key=True)
    shoutout_id = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(String)  # like, clap, star