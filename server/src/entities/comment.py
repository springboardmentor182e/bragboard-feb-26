from datetime import datetime
from sqlalchemy import String, Integer, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column
from src.database.core import Base


class Comment(Base):

    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    shoutout_id: Mapped[int] = mapped_column(Integer, ForeignKey("shoutouts.id"))
    author_name: Mapped[str] = mapped_column(String(120))
    content: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )