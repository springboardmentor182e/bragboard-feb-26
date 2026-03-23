from sqlalchemy.orm import Session
from sqlalchemy import func,text
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any

from src.entities.user import User
from src.admin.models import AdminReport, ActivityLog, DashboardStats,UserContribution
from src.admin import schemas
# from src.auth.service import *
from src.admin.models import UserContribution

# Try to import Shoutout model
try:
    from src.entities.shoutout import Shoutout  # type: ignore
    SHOUTOUT_AVAILABLE = True
except (ImportError, ModuleNotFoundError):
    SHOUTOUT_AVAILABLE = False
    Shoutout = None
    print("⚠️ Shoutout model not available - posts/reactions will be 0")

class AdminService:
    def __init__(self, db: Session):
        self.db = db
    
    # User management functions
    def get_all_users(self, skip: int = 0, limit: int = 100) -> List[User]:
        return self.db.query(User).offset(skip).limit(limit).all()
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()
    
    def get_dashboard_stats(self) -> Dict[str, Any]:
        """Get REAL dashboard statistics from database"""
        try:
            # 1️⃣ TOTAL USERS
            total_users = self.db.query(User).count()
            
            # 2️⃣ ADMIN COUNT
            admin_count = self.db.query(User).filter(User.is_admin == True).count()
            
            # 3️⃣ ACTIVE USERS TODAY
            today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
            active_users_today = self.db.query(ActivityLog).filter(
                ActivityLog.timestamp >= today_start
            ).distinct(ActivityLog.user_id).count()
            
            # 4️⃣ NEW USERS THIS WEEK
            week_ago = datetime.now() - timedelta(days=7)
            new_users_this_week = self.db.query(User).filter(
                User.created_at >= week_ago
            ).count()
            
            # 5️⃣ TOTAL REPORTS
            total_reports = self.db.query(AdminReport).count()
            
            # 6️⃣ TOTAL POSTS & REACTIONS (if Shoutout model exists)
            total_posts = 0
            total_reactions = 0
            
            if SHOUTOUT_AVAILABLE and Shoutout is not None:
                try:
                    total_posts = self.db.query(Shoutout).count()
                    
                    # Sum all likes/reactions
                    result = self.db.query(func.sum(Shoutout.likes_count)).scalar()
                    total_reactions = result if result is not None else 0
                    
                    print(f"📊 Found {total_posts} posts with {total_reactions} reactions")
                except Exception as e:
                    print(f"Error counting posts: {e}")
            
            # 7️⃣ REPORTS PENDING
            # If you have a status column, uncomment this
            # reports_pending = self.db.query(Report).filter(Report.status == 'pending').count()
            
            return {
                "total_users": total_users,
                "active_users_today": active_users_today,
                "active_users": active_users_today,  # Alias for frontend
                "total_posts": total_posts,
                "total_shoutouts": total_posts,  # Alias for frontend
                "total_reactions": total_reactions,
                "total_reports": total_reports,
                "reports": total_reports,  # Alias for frontend
                "new_users_this_week": new_users_this_week,
                "admin_count": admin_count,
                # "reports_pending": reports_pending
            }
            
        except Exception as e:
            print(f"❌ Error in get_dashboard_stats: {e}")
            import traceback
            traceback.print_exc()
            return {
                "total_users": 0,
                "active_users_today": 0,
                "total_posts": 0,
                "total_reactions": 0,
                "total_reports": 0,
                "new_users_this_week": 0,
                "admin_count": 0
            }
    
    def get_reports(self, skip: int = 0, limit: int = 100, status: str = None) -> List[AdminReport]:
        """Get all reports, optionally filtered by status"""
        try:
            query = self.db.query(AdminReport)
            
            # Filter by status if provided
            if status:
                query = query.filter(AdminReport.status == status)
            else:
                # Default: show all except resolved? Or all?
                # You can decide. I'll show all for now
                pass
                
            reports = query.order_by(
                AdminReport.created_at.desc()
            ).offset(skip).limit(limit).all()
            
            print(f"📋 Found {len(reports)} reports")
            return reports
        except Exception as e:
            print(f"Error fetching reports: {e}")
        return []

    def resolve_report(self, report_id: int) -> bool:
        """Resolve a report - database locked error fix"""
        try:
            print(f"🔍 Attempting to resolve report {report_id}")
            
            # SQLite ke liye special handling
            if 'sqlite' in str(self.db.bind.url):
                self.db.execute(text("PRAGMA journal_mode=WAL"))
                self.db.execute(text("BEGIN IMMEDIATE"))
            
            # Report dhundho
            report = self.db.query(AdminReport).filter(AdminReport.id == report_id).first()
            
            if not report:
                print(f"❌ Report {report_id} not found")
                return False
            
            # Status update karo
            report.status = "resolved"
            
            # Activity log - safe way
            try:
                log = ActivityLog(
                    user_id=1,
                    action="resolve_report",
                    details={"report_id": report_id, "timestamp": str(datetime.now())}
                )
                self.db.add(log)
            except Exception as log_error:
                print(f"⚠️ Log error (non-critical): {log_error}")
            
            self.db.commit()
            print(f"✅ Report {report_id} resolved successfully")
            return True
            
        except Exception as e:
            print(f"❌ Error resolving report {report_id}: {e}")
            self.db.rollback()
            return False
    
    def delete_post(self, post_id: int) -> bool:
        """Delete a post/report"""
        try:
            print(f"🔍 Attempting to delete post/report {post_id}")
            
            # Find the report/post
            report = self.db.query(AdminReport).filter(AdminReport.id == post_id).first()
            
            if not report:
                print(f"❌ Report {post_id} not found")
                return False
            
            # Store info for logging before deletion
            report_info = {
                "id": report.id,
                "title": report.title,
                "type": report.type,
                "created_at": str(report.created_at)
            }
            
            # Delete the report
            self.db.delete(report)
            self.db.flush()
            
            # Log the deletion
            log = ActivityLog(
                user_id=1,  # TODO: Get from actual logged-in user
                action="delete_post",
                details={
                    "post_id": post_id,
                    "deleted_report": report_info,
                    "timestamp": str(datetime.now())
                }
            )
            self.db.add(log)
            
            self.db.commit()
            print(f"✅ Post {post_id} deleted successfully and logged")
            return True
            
        except Exception as e:
            print(f"❌ Error deleting post {post_id}: {e}")
            self.db.rollback()
            return False
    
    def get_top_contributors(self, limit: int = 5) -> List[Dict]:
        """Get top contributors from database"""
        try:
            contributors = self.db.query(
                UserContribution.user_name,
                UserContribution.total_interactions
            ).order_by(
                UserContribution.total_interactions.desc()
            ).limit(limit).all()
            
            colors = ['#3882F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']
            result = []
            
            for idx, (name, value) in enumerate(contributors):
                result.append({
                    "name": name,
                    "value": value or 0,
                    "fill": colors[idx % len(colors)]
                })
            
            return result
        except Exception as e:
            print(f"Error getting top contributors: {e}")
            return []
    
    def update_user_contributions(self):
        """Calculate and update user contributions based on actual data"""
        try:
            if not SHOUTOUT_AVAILABLE:
                print("⚠️ Shoutout model not available, cannot update contributions")
                return False
                
            # Get all users
            users = self.db.query(User).all()
            updated_count = 0
            
            for user in users:
                try:
                    # Calculate shoutouts given
                    shoutouts_given = self.db.query(Shoutout).filter(
                        Shoutout.given_by == user.id
                    ).count()
                    
                    # Calculate shoutouts received
                    shoutouts_received = self.db.query(Shoutout).filter(
                        Shoutout.given_to == user.id
                    ).count()
                    
                    total = shoutouts_given + shoutouts_received
                    
                    # Update or create contribution record
                    contribution = self.db.query(UserContribution).filter(
                        UserContribution.user_id == user.id
                    ).first()
                    
                    if contribution:
                        contribution.shoutouts_given = shoutouts_given
                        contribution.shoutouts_received = shoutouts_received
                        contribution.total_interactions = total
                        contribution.user_name = user.full_name or user.username or f"User {user.id}"
                    else:
                        contribution = UserContribution(
                            user_id=user.id,
                            user_name=user.full_name or user.username or f"User {user.id}",
                            shoutouts_given=shoutouts_given,
                            shoutouts_received=shoutouts_received,
                            total_interactions=total
                        )
                        self.db.add(contribution)
                    
                    updated_count += 1
                    
                except Exception as e:
                    print(f"Error updating user {user.id}: {e}")
                    continue
            
            self.db.commit()
            print(f"✅ Updated contributions for {updated_count} users")
            return True
            
        except Exception as e:
            print(f"❌ Error updating contributions: {e}")
            self.db.rollback()
            return False