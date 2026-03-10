from sqlalchemy import Column, Integer, String
from core import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    department = Column(String)
    points = Column(Integer)
    badges = Column(Integer)
    trend = Column(String)