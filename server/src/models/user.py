from sqlalchemy import Column, Integer, String
from src.database.core import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    department = Column(String, nullable=True)

    points = Column(Integer, default=0)

    badges = Column(Integer, default=0)

    trend = Column(Integer, default=0)