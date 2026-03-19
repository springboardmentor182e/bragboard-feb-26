from sqlalchemy import Column, Integer, String, JSON
from ..database.core import Base

class ShoutoutEntity(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)
    author = Column(String)
    recipient = Column(String)
    department = Column(String)
    message = Column(String)
    badge = Column(JSON)      # Stores {"label": "..."}
    reactions = Column(JSON)  # Stores {"hearts": 38, ...}
    status = Column(String)
    date = Column(String)
