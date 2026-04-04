from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime
from ..database.core import Base


class AdminSettings(Base):
    __tablename__ = "admin_settings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    # 🔐 PASSWORD POLICY
    password_min_length = Column(Integer, default=8, nullable=False)
    require_special_chars = Column(Boolean, default=True, nullable=False)

    # ⏱️ SESSION MANAGEMENT
    session_timeout_minutes = Column(Integer, default=60, nullable=False)
    max_login_attempts = Column(Integer, default=5, nullable=False)

    # 📢 SHOUTOUT CONFIGURATION
    shoutout_daily_limit = Column(Integer, default=5, nullable=False)
    shoutout_weekly_limit = Column(Integer, default=20, nullable=False)

    # 📧 SYSTEM STATUS
    email_system_enabled = Column(Boolean, default=True, nullable=False)

    # 📅 TIMESTAMPS
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
