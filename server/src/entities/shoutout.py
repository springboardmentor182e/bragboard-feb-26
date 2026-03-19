from sqlalchemy import Integer, String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from src.database.core import Base


class Shoutout(Base):
    __tablename__ = "shoutouts"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    sender_name: Mapped[str] = mapped_column(String(120))
    receiver_name: Mapped[str] = mapped_column(String(120))

    receiver_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    badge: Mapped[str] = mapped_column(String(80))
    campaign: Mapped[str | None] = mapped_column(String(120), nullable=True)

    message: Mapped[str] = mapped_column(Text)

    level: Mapped[int] = mapped_column(Integer, default=1)
    likes: Mapped[int] = mapped_column(Integer, default=0)
    comments: Mapped[int] = mapped_column(Integer, default=0)
    shares: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )