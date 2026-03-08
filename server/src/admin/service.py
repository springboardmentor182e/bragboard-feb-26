from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any

from src.entities.user import User
from src.admin.models import Report, ActivityLog, DashboardStats
from src.admin import schemas
from src.auth.service import get_password_hash

class AdminService:
    def __init__(self, db: Session):
        self.db = db
    
    # User management functions
    def get_all_users(self, skip: int = 0, limit: int = 100) -> List[User]:
        return self.db.query(User).offset(skip).limit(limit).all()
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()
    
    def get_dashboard_stats(self) -> Dict[str, Any]:
        """Get dashboard statistics"""
        try:
            total_users = self.db.query(User).count()
            admin_count = self.db.query(User).filter(User.is_admin == True).count()
            
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
    
    def get_reports(self, skip: int = 0, limit: int = 100) -> List[Report]:
        """Get all reports"""
        return self.db.query(Report).offset(skip).limit(limit).all()
    
    # ✨ NEW: Resolve report method
    def resolve_report(self, report_id: int) -> bool:
        """Resolve a report"""
        try:
            print(f"Attempting to resolve report {report_id}")
            
            # Find the report
            report = self.db.query(Report).filter(Report.id == report_id).first()
            
            if not report:
                print(f"Report {report_id} not found")
                return False
            
            # Log activity
            log = ActivityLog(
                user_id=1,  # Current user ID (update this with real user)
                action="resolve_report",
                details={"report_id": report_id, "timestamp": str(datetime.now())}
            )
            self.db.add(log)
            
            # Optional: Update report status (if you have status column)
            # report.status = "resolved"
            
            self.db.commit()
            print(f"✅ Report {report_id} resolved successfully")
            return True
            
        except Exception as e:
            print(f"❌ Error resolving report {report_id}: {e}")
            self.db.rollback()
            return False
    
    # ✨ NEW: Delete post method
def delete_post(self, post_id: int) -> bool:
    """Delete a post"""
    try:
        print(f"🔍 Attempting to delete post/report {post_id}")
        
        # Find the report/post
        report = self.db.query(Report).filter(Report.id == post_id).first()
        
        if not report:
            print(f"❌ Report {post_id} not found")
            return False
        
        # Pehle delete karo
        self.db.delete(report)
        self.db.flush()  # Temporary commit
        
        # Phir log add karo
        log = ActivityLog(
            user_id=1,
            action="delete_post",
            details={
                "post_id": post_id, 
                "timestamp": str(datetime.now()),
                "deleted_report": str(report.__dict__)  # Log me store karo
            }
        )
        self.db.add(log)
        
        # Final commit
        self.db.commit()
        print(f"✅ Post {post_id} deleted successfully and logged")
        return True
        
    except Exception as e:
        print(f"❌ Error deleting post {post_id}: {e}")
        self.db.rollback()
        return False