from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.core import Base


class Shoutout(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)

    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    message = Column(String, nullable=False)
    badge = Column(String, nullable=False)

    likes = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # ✅ FINAL FIX (IMPORTANT)
    sender = relationship(
        "User",
        foreign_keys=[sender_id],
        back_populates="sent_shoutouts"
    )

    receiver = relationship(
        "User",
        foreign_keys=[receiver_id],
        back_populates="received_shoutouts"
    )