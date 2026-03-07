from datetime import datetime
from sqlalchemy import String, Text, Integer, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from src.database.core import Base


class Shoutout(Base):
    __tablename__ = "shoutouts"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    teammate: Mapped[str] = mapped_column(String(120), nullable=False)
    badge: Mapped[str] = mapped_column(String(80), nullable=False)
    campaign: Mapped[str | None] = mapped_column(String(120), nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    points: Mapped[int] = mapped_column(Integer, default=100, nullable=False)
    reactions_like: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    reactions_star: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    reactions_clap: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )