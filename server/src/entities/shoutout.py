from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from src.database.core import Base


class Shoutout(Base):
    __tablename__ = "shoutouts"
    __table_args__ = {'extend_existing': True}  # Fix: prevents duplicate table error

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    # Your teammate A's fields
    sender_name: Mapped[str] = mapped_column(String(120), nullable=True)
    receiver_name: Mapped[str] = mapped_column(String(120), nullable=True)
    badge: Mapped[str] = mapped_column(String(80), nullable=True)
    campaign: Mapped[str | None] = mapped_column(String(120), nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=True)
    level: Mapped[int] = mapped_column(Integer, default=1)
    likes: Mapped[int] = mapped_column(Integer, default=0)
    stars: Mapped[int] = mapped_column(Integer, default=0)
    claps: Mapped[int] = mapped_column(Integer, default=0)
    comments: Mapped[int] = mapped_column(Integer, default=0)
    shares: Mapped[int] = mapped_column(Integer, default=0)

    # Your teammate B's fields
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    category = Column(String, nullable=True)
    points = Column(Integer, default=0)
    status = Column(String, default="PENDING")

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # Relationships
    sender = relationship("User", foreign_keys=[sender_id])
    receiver = relationship("User", foreign_keys=[receiver_id])