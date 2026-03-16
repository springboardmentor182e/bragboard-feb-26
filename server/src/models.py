from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from src.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    department = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    achievements = relationship("Achievement", back_populates="employee")
    sent_shoutouts = relationship("Shoutout", foreign_keys="Shoutout.sender_id", back_populates="sender")
    received_shoutouts = relationship("Shoutout", foreign_keys="Shoutout.recipient_id", back_populates="recipient")

    def __repr__(self):
        return f"<Employee id={self.id} name={self.name} dept={self.department}>"


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    points = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    employee = relationship("Employee", back_populates="achievements")

    def __repr__(self):
        return f"<Achievement id={self.id} title={self.title} points={self.points}>"


class Shoutout(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    recipient_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    message = Column(String, nullable=False)
    likes = Column(Integer, default=0, nullable=False)
    claps = Column(Integer, default=0, nullable=False)
    stars = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    sender = relationship("Employee", foreign_keys=[sender_id], back_populates="sent_shoutouts")
    recipient = relationship("Employee", foreign_keys=[recipient_id], back_populates="received_shoutouts")

    def __repr__(self):
        return f"<Shoutout id={self.id} from={self.sender_id} to={self.recipient_id}>"