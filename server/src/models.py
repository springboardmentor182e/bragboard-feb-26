from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from src.database import Base


# =========================
# 👤 USER MODEL (NEW)
# =========================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fire_badges = Column(Integer, default=0)
    star_badges = Column(Integer, default=0)
    thumb_badges = Column(Integer, default=0)

    # 🔗 One user → one employee
    employee = relationship("Employee", back_populates="user", uselist=False)

    def __repr__(self):
        return f"<User id={self.id} fire={self.fire_badges} star={self.star_badges} thumb={self.thumb_badges}>"


# =========================
# 👨‍💼 EMPLOYEE
# =========================
class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    department = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # 🔗 Link to User
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="employee")

    achievements = relationship("Achievement", back_populates="employee")

    sent_shoutouts = relationship(
        "Shoutout",
        foreign_keys="Shoutout.sender_id",
        back_populates="sender"
    )

    received_shoutouts = relationship(
        "Shoutout",
        foreign_keys="Shoutout.recipient_id",
        back_populates="recipient"
    )

    def __repr__(self):
        return f"<Employee id={self.id} name={self.name} dept={self.department}>"


# =========================
# 🏆 ACHIEVEMENTS
# =========================
class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    points = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("Employee", back_populates="achievements")

    def __repr__(self):
        return f"<Achievement id={self.id} title={self.title} points={self.points}>"


# =========================
# 📣 SHOUTOUTS
# =========================
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

    sender = relationship(
        "Employee",
        foreign_keys=[sender_id],
        back_populates="sent_shoutouts"
    )

    recipient = relationship(
        "Employee",
        foreign_keys=[recipient_id],
        back_populates="received_shoutouts"
    )

    comments = relationship(
        "Comment",
        back_populates="shoutout",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Shoutout id={self.id} from={self.sender_id} to={self.recipient_id}>"


# =========================
# 💬 COMMENTS
# =========================
class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    shoutout_id = Column(Integer, ForeignKey("shoutouts.id", ondelete="CASCADE"), nullable=False)
    author_id = Column(Integer, ForeignKey("employees.id"), nullable=False)

    text = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    shoutout = relationship("Shoutout", back_populates="comments")
    author = relationship("Employee")

    def __repr__(self):
        return f"<Comment id={self.id} shoutout={self.shoutout_id} author={self.author_id}>"