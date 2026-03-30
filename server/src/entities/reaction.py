from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database.core import Base
import enum


class ReactionType(str, enum.Enum):
    like = "like"
    clap = "clap"
    star = "star"


class Reaction(Base):
    __tablename__ = "reactions"

    id = Column(Integer, primary_key=True, index=True)
    shoutout_id = Column(Integer, ForeignKey("shoutouts.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    reaction_type = Column(Enum(ReactionType), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    shoutout = relationship("Shoutout", back_populates="reactions")
    user = relationship("User")
