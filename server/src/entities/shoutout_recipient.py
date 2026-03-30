from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database.core import Base


class ShoutOutRecipient(Base):
    __tablename__ = "shoutout_recipients"

    id = Column(Integer, primary_key=True, index=True)
    
    shoutout_id = Column(Integer, ForeignKey("shoutouts.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    shoutout = relationship("Shoutout", back_populates="recipients")
    user = relationship("User")
