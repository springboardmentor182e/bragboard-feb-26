from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from ..database.core import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    department = Column(String)

    role = Column(String)

    status = Column(String)

    # 🔐 PASSWORD RESET FIELDS
    password_reset_otp = Column(String, nullable=True)

    password_reset_expires = Column(DateTime, nullable=True)

    # 🔔 NOTIFICATION PREFERENCES
    email_notifications = Column(Boolean, default=True, nullable=False)
    push_notifications = Column(Boolean, default=True, nullable=False)
    shoutout_alerts = Column(Boolean, default=True, nullable=False)
    comment_alerts = Column(Boolean, default=True, nullable=False)
    mention_alerts = Column(Boolean, default=True, nullable=False)

    # 🎨 APPEARANCE PREFERENCES
    theme = Column(String, default="dark", nullable=False)  # light, dark, system
    compact_mode = Column(Boolean, default=False, nullable=False)
    font_size = Column(String, default="medium", nullable=False)  # small, medium, large

    # 🌍 REGION & LANGUAGE PREFERENCES
    language = Column(String, default="English", nullable=False)
    timezone = Column(String, default="UTC", nullable=False)
    date_format = Column(String, default="MM/DD/YYYY", nullable=False)
    time_format = Column(String, default="12-hour", nullable=False)
    week_start = Column(String, default="Monday", nullable=False)
    currency = Column(String, default="USD - US Dollar", nullable=False)

    # 🔐 SECURITY PREFERENCES
    two_factor_enabled = Column(Boolean, default=False, nullable=False)
    session_timeout = Column(Integer, default=30, nullable=False)  # minutes
    login_alerts_enabled = Column(Boolean, default=True, nullable=False)
    password_changed_at = Column(DateTime, nullable=True)