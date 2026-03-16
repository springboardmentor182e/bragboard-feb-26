from sqlalchemy import Column, Integer, String, ForeignKey
from src.database.core import Base


class Shoutout(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    points = Column(Integer, nullable=False)
    receiver_id = Column(Integer, ForeignKey("users.id"))