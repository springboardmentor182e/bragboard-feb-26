from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any

from src.entities.user import User
from src.admin.models import Report, ActivityLog, DashboardStats
from src.admin import schemas
from src.auth.service import get_password_hash  # Now this will work!

class AdminService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all_users(self, skip: int = 0, limit: int = 100) -> List[User]:
        return self.db.query(User).offset(skip).limit(limit).all()
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()
    
    def get_dashboard_stats(self) -> Dict[str, Any]:
        """Get dashboard statistics"""
        try:
            total_users = self.db.query(User).count()
            admin_count = self.db.query(User).filter(User.is_admin == True).count()
            
            # Try to get reports count, but don't fail if table doesn't exist
            try:
                total_reports = self.db.query(Report).count()
            except:
                total_reports = 0
                
            return {
                "total_users": total_users,
                "active_users_today": 0,
                "total_posts": 0,
                "total_reactions": 0,
                "total_reports": total_reports,
                "new_users_this_week": 0,
                "admin_count": admin_count
            }
        except Exception as e:
            print(f"Error in get_dashboard_stats: {e}")
            return {
                "total_users": 0,
                "active_users_today": 0,
                "total_posts": 0,
                "total_reactions": 0,
                "total_reports": 0,
                "new_users_this_week": 0,
                "admin_count": 0
            }
    
    def get_activity_logs(self, skip: int = 0, limit: int = 100) -> List[ActivityLog]:
        return self.db.query(ActivityLog).order_by(
            ActivityLog.timestamp.desc()
        ).offset(skip).limit(limit).all()