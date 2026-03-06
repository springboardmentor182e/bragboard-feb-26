from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, JSON, Boolean
from sqlalchemy.sql import func
from src.database.core import Base

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    type = Column(String)  # 'admin', 'shoutouts', 'analytics'
    content = Column(JSON, nullable=True)  # Store report data as JSON
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
class ActivityLog(Base):
    __tablename__ = "activity_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String)  # 'login', 'create_post', 'delete_user', etc.
    details = Column(JSON)
    ip_address = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class DashboardStats(Base):
    __tablename__ = "dashboard_stats"
    
    id = Column(Integer, primary_key=True, index=True)
    stat_key = Column(String, unique=True)  # 'total_users', 'active_today', etc.
    stat_value = Column(Integer, default=0)
    # CHANGED: Renamed 'metadata' to 'stat_metadata' to avoid reserved word
    stat_metadata = Column(JSON, nullable=True)  # Renamed from 'metadata'
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())