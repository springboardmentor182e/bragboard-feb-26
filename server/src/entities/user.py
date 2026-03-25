from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from src.database.core import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    department = Column(String, nullable=False)

    role = Column(String, default="Employee")
    status = Column(String, default="Active")

    password = Column(String, nullable=False)

    # 🔥 STATS
    points = Column(Integer, default=0)
    shoutouts_count = Column(Integer, default=0)
    reactions_count = Column(Integer, default=0)

    # ✅ RELATIONSHIPS (VERY IMPORTANT)
    sent_shoutouts = relationship(
        "Shoutout",
        foreign_keys="Shoutout.sender_id",
        back_populates="sender",
        cascade="all, delete"
    )

    received_shoutouts = relationship(
        "Shoutout",
        foreign_keys="Shoutout.receiver_id",
        back_populates="receiver",
        cascade="all, delete"
    )