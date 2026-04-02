from sqlalchemy.orm import Session
from sqlalchemy import func,text
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any

from ..entities.user import User
from .models import AdminReport, ActivityLog, DashboardStats,UserContribution
from . import schemas
# from ..auth.service import *
from .models import UserContribution

# Try to import Shoutout model
try:
    from ..entities.shoutout import Shoutout  # type: ignore
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
            # 1️⃣ TOTAL USERS (Active status only)
            active_users = self.db.query(User).filter(User.status == "Active").count()
            
            # 2️⃣ ADMIN COUNT
            admin_count = self.db.query(User).filter(User.role == "Admin").count()
            
            # 3️⃣ ACTIVE USERS TODAY
            today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
            active_users_today = self.db.query(ActivityLog).filter(
                ActivityLog.timestamp >= today_start
            ).distinct(ActivityLog.user_id).count()
            
            # 5️⃣ TOTAL REPORTS
            total_reports = self.db.query(AdminReport).count()
            
            # 6️⃣ PENDING USERS (awaiting approval)
            pending_users = self.db.query(User).filter(User.status == "Pending").count()
            
            # 7️⃣ TOTAL POSTS (Shoutouts)
            total_posts = 0
            total_reactions = 0
            
            if SHOUTOUT_AVAILABLE and Shoutout is not None:
                try:
                    total_posts = self.db.query(Shoutout).count()
                    
                    # Count all reactions from Reaction table
                    from ..entities.reaction import Reaction
                    total_reactions = self.db.query(Reaction).count()
                    
                    print(f"📊 Found {total_posts} posts with {total_reactions} reactions and {active_users} active users")
                except Exception as e:
                    print(f"Error counting posts/reactions: {e}")
                    total_posts = 0
                    total_reactions = 0
            
            return {
                "total_users": active_users,
                "active_users": active_users,
                "total_posts": total_posts,
                "total_shoutouts": total_posts,
                "total_reactions": total_reactions,
                "total_reports": total_reports,
                "reports": total_reports,
                "active_users_today": active_users_today,
                "admin_count": admin_count,
                "pending_users": pending_users,
            }
            
        except Exception as e:
            print(f"❌ Error in get_dashboard_stats: {e}")
            import traceback
            traceback.print_exc()
            return {
                "total_users": 0,
                "active_users": 0,
                "total_posts": 0,
                "total_reactions": 0,
                "total_reports": 0,
                "reports": 0,
                "active_users_today": 0,
                "admin_count": 0,
                "pending_users": 0,
            }
    
    def get_engagement_analytics(self) -> Dict[str, Any]:
        """Get comprehensive engagement analytics for dashboard"""
        try:
            analytics = {
                "top_contributors": [],
                "department_engagement": [],
                "category_breakdown": [],
                "reaction_breakdown": {"like": 0, "clap": 0, "star": 0},
                "engagement_trend": []
            }
            
            if not SHOUTOUT_AVAILABLE or Shoutout is None:
                return analytics
            
            try:
                from ..entities.shoutout_recipient import ShoutOutRecipient
                from ..entities.reaction import Reaction
                
                # 1️⃣ TOP CONTRIBUTORS (Most Shout-outs sent + received + reactions)
                sent_query = self.db.query(
                    User.name,
                    User.department,
                    func.count(Shoutout.id).label('sent_count')
                ).join(Shoutout, Shoutout.sender_id == User.id).filter(
                    Shoutout.status.in_(['APPROVED', 'PENDING'])
                ).group_by(User.id, User.name, User.department).order_by(
                    func.count(Shoutout.id).desc()
                ).limit(5).all()
                
                contributors_dict = {}
                for name, dept, count in sent_query:
                    contributors_dict[name] = {
                        "name": name,
                        "department": dept or "Unknown",
                        "sent": count,
                        "received": 0,
                        "reactions": 0,
                        "engagement_score": count
                    }
                
                # Get received shout-outs
                received_query = self.db.query(
                    User.name,
                    func.count(ShoutOutRecipient.id).label('received_count')
                ).join(ShoutOutRecipient, ShoutOutRecipient.user_id == User.id).join(
                    Shoutout, Shoutout.id == ShoutOutRecipient.shoutout_id
                ).filter(Shoutout.status.in_(['APPROVED', 'PENDING'])).group_by(User.id, User.name).all()
                
                for name, count in received_query:
                    if name not in contributors_dict:
                        contributors_dict[name] = {"name": name, "department": "Unknown", "sent": 0, "received": count, "reactions": 0, "engagement_score": 0}
                    else:
                        contributors_dict[name]["received"] = count
                
                # Get reactions received - need to join shoutout → recipients → reactions
                reactions_query = self.db.query(
                    User.name,
                    func.count(Reaction.id).label('reaction_count')
                ).join(ShoutOutRecipient, ShoutOutRecipient.user_id == User.id).join(
                    Shoutout, Shoutout.id == ShoutOutRecipient.shoutout_id
                ).join(Reaction, Reaction.shoutout_id == Shoutout.id
                ).filter(Shoutout.status.in_(['APPROVED', 'PENDING'])
                ).group_by(User.id, User.name).all()
                
                for name, count in reactions_query:
                    if name not in contributors_dict:
                        contributors_dict[name] = {"name": name, "department": "Unknown", "sent": 0, "received": 0, "reactions": count, "engagement_score": 0}
                    else:
                        contributors_dict[name]["reactions"] = count
                
                # Calculate engagement score and sort
                for contributor in contributors_dict.values():
                    contributor["engagement_score"] = (
                        contributor["sent"] * 1.5 + 
                        contributor["received"] * 2 + 
                        contributor["reactions"] * 0.5
                    )
                
                analytics["top_contributors"] = sorted(
                    list(contributors_dict.values()),
                    key=lambda x: x["engagement_score"],
                    reverse=True
                )[:5]
                
                # 2️⃣ DEPARTMENT ENGAGEMENT - Get all departments with their members and shoutouts
                # First, get all departments and member counts
                all_depts = self.db.query(
                    User.department,
                    func.count(User.id).label('member_count')
                ).filter(User.department.isnot(None)).group_by(User.department).all()
                
                dept_data = {}
                for dept, member_count in all_depts:
                    dept_data[dept or "Unknown"] = {
                        "department": dept or "Unknown",
                        "members": member_count,
                        "shoutouts": 0,
                        "engagement_rate": 0
                    }
                
                # Now count shoutouts by sender's department (include both APPROVED and PENDING)
                shoutout_query = self.db.query(
                    User.department,
                    func.count(Shoutout.id).label('shoutout_count')
                ).join(Shoutout, Shoutout.sender_id == User.id).filter(
                    Shoutout.status.in_(['APPROVED', 'PENDING'])
                ).group_by(User.department).all()
                
                for dept, shoutout_count in shoutout_query:
                    dept_key = dept or "Unknown"
                    if dept_key in dept_data:
                        dept_data[dept_key]["shoutouts"] = shoutout_count
                    else:
                        dept_data[dept_key] = {
                            "department": dept_key,
                            "members": 0,
                            "shoutouts": shoutout_count,
                            "engagement_rate": 0
                        }
                
                # Calculate engagement rate and percentage
                total_shoutouts = sum([d["shoutouts"] for d in dept_data.values()])
                for dept_info in dept_data.values():
                    if dept_info["members"] > 0:
                        dept_info["engagement_rate"] = round((dept_info["shoutouts"] / dept_info["members"]) * 100, 1)
                    if total_shoutouts > 0:
                        dept_info["percentage"] = round((dept_info["shoutouts"] / total_shoutouts) * 100, 1)
                    else:
                        dept_info["percentage"] = 0
                
                # Add to analytics and sort by shoutouts descending
                analytics["department_engagement"] = sorted(
                    list(dept_data.values()),
                    key=lambda x: x["shoutouts"],
                    reverse=True
                )
                
                # 3️⃣ CATEGORY BREAKDOWN
                category_query = self.db.query(
                    Shoutout.category,
                    func.count(Shoutout.id).label('count')
                ).filter(Shoutout.status == 'APPROVED').group_by(
                    Shoutout.category
                ).all()
                
                total_by_category = sum([c[1] for c in category_query])
                for category, count in category_query:
                    analytics["category_breakdown"].append({
                        "category": category or "Uncategorized",
                        "count": count,
                        "percentage": round((count / total_by_category * 100), 1) if total_by_category > 0 else 0
                    })
                
                # 4️⃣ REACTION TYPES BREAKDOWN
                reaction_query = self.db.query(
                    Reaction.reaction_type,
                    func.count(Reaction.id).label('count')
                ).group_by(Reaction.reaction_type).all()
                
                for reaction_type, count in reaction_query:
                    analytics["reaction_breakdown"][reaction_type] = count
                
                print(f"📊 Engagement Analytics - {len(analytics['top_contributors'])} contributors, {len(analytics['department_engagement'])} depts")
                
            except Exception as e:
                print(f"❌ Error calculating engagement metrics: {e}")
                import traceback
                traceback.print_exc()
            
            return analytics
            
        except Exception as e:
            print(f"❌ Error in get_engagement_analytics: {e}")
            return {
                "top_contributors": [],
                "department_engagement": [],
                "category_breakdown": [],
                "reaction_breakdown": {}
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