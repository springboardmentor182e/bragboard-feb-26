from sqlalchemy.orm import Session
from sqlalchemy import func, text
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any

from ..entities.user import User
from ..entities.shoutout import Shoutout
from ..entities.reaction import Reaction
from ..entities.report import Report
from .models import ActivityLog, UserContribution


class AdminService:
    def __init__(self, db: Session):
        self.db = db

    # ─────────────────────────────────────────
    # DASHBOARD STATS
    # ─────────────────────────────────────────
    def get_dashboard_stats(self) -> Dict[str, Any]:
        try:
            total_users = self.db.query(User).count()
            admin_count = self.db.query(User).filter(User.role == "Admin").count()
            new_users_this_week = self.db.query(User).filter(
                User.created_at >= datetime.utcnow() - timedelta(days=7)
            ).count() if hasattr(User, "created_at") else 0

            total_shoutouts = self.db.query(Shoutout).count()
            total_reactions = self.db.query(Reaction).count()

            pending_reports = self.db.query(Report).filter(Report.status == "PENDING").count()
            total_reports = self.db.query(Report).count()

            # shoutout trend: this week vs last week
            one_week_ago = datetime.utcnow() - timedelta(days=7)
            two_weeks_ago = datetime.utcnow() - timedelta(days=14)
            this_week = self.db.query(Shoutout).filter(Shoutout.created_at >= one_week_ago).count()
            last_week = self.db.query(Shoutout).filter(
                Shoutout.created_at >= two_weeks_ago,
                Shoutout.created_at < one_week_ago
            ).count()
            if last_week > 0:
                trend_pct = round(((this_week - last_week) / last_week) * 100)
                shoutout_trend = f"+{trend_pct}%" if trend_pct >= 0 else f"{trend_pct}%"
            else:
                shoutout_trend = "+0%"

            return {
                "total_users": total_users,
                "active_users": total_users,
                "admin_count": admin_count,
                "new_users_this_week": new_users_this_week,
                "total_posts": total_shoutouts,
                "total_shoutouts": total_shoutouts,
                "total_reactions": total_reactions,
                "total_reports": total_reports,
                "reports": pending_reports,
                "shoutout_trend": shoutout_trend,
                "reaction_trend": "+0%",
            }
        except Exception as e:
            print(f"Error in get_dashboard_stats: {e}")
            return {
                "total_users": 0, "active_users": 0, "admin_count": 0,
                "new_users_this_week": 0, "total_posts": 0, "total_shoutouts": 0,
                "total_reactions": 0, "total_reports": 0, "reports": 0,
                "shoutout_trend": "+0%", "reaction_trend": "+0%",
            }

    # ─────────────────────────────────────────
    # TOP CONTRIBUTORS  (live from shoutouts table)
    # ─────────────────────────────────────────
    def get_top_contributors(self, limit: int = 5) -> List[Dict]:
        try:
            rows = (
                self.db.query(User.name, func.count(Shoutout.id).label("given"))
                .join(Shoutout, Shoutout.sender_id == User.id)
                .group_by(User.id, User.name)
                .order_by(func.count(Shoutout.id).desc())
                .limit(limit)
                .all()
            )
            colors = ["#6366f1", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]
            return [
                {"name": name, "value": given, "fill": colors[i % len(colors)]}
                for i, (name, given) in enumerate(rows)
            ]
        except Exception as e:
            print(f"Error in get_top_contributors: {e}")
            return []

    # ─────────────────────────────────────────
    # DEPARTMENT STATS  (live from shoutouts + users)
    # ─────────────────────────────────────────
    def get_department_stats(self) -> List[Dict]:
        try:
            rows = (
                self.db.query(User.department, func.count(Shoutout.id).label("count"))
                .join(Shoutout, Shoutout.sender_id == User.id)
                .filter(User.department.isnot(None))
                .group_by(User.department)
                .order_by(func.count(Shoutout.id).desc())
                .all()
            )
            if not rows:
                # fallback: just count users per dept
                rows = (
                    self.db.query(User.department, func.count(User.id).label("count"))
                    .filter(User.department.isnot(None))
                    .group_by(User.department)
                    .all()
                )
            colors = [
                "#6366f1", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6",
                "#ec4899", "#14b8a6", "#f97316",
            ]
            total = sum(c for _, c in rows) or 1
            return [
                {
                    "name": dept or "Unknown",
                    "value": round((count / total) * 100, 1),
                    "count": count,
                    "color": colors[i % len(colors)],
                }
                for i, (dept, count) in enumerate(rows)
            ]
        except Exception as e:
            print(f"Error in get_department_stats: {e}")
            return []

    # ─────────────────────────────────────────
    # SHOUTOUTS  (admin full list)
    # ─────────────────────────────────────────
    def get_all_shoutouts(self, skip: int = 0, limit: int = 100,
                          search: str = None, department: str = None,
                          status: str = None) -> List[Dict]:
        try:
            query = self.db.query(Shoutout)

            if status:
                query = query.filter(Shoutout.status == status)

            shoutouts = query.order_by(Shoutout.created_at.desc()).offset(skip).limit(limit).all()

            result = []
            for s in shoutouts:
                sender_name = s.sender.name if s.sender else "Unknown"
                sender_dept = s.sender.department if s.sender else None
                receiver_name = s.receiver.name if s.receiver else "Unknown"

                if search:
                    search_lower = search.lower()
                    if (search_lower not in sender_name.lower() and
                            search_lower not in (s.message or "").lower() and
                            search_lower not in receiver_name.lower()):
                        continue

                if department and sender_dept != department:
                    continue

                reaction_count = self.db.query(Reaction).filter(
                    Reaction.shoutout_id == s.id
                ).count()

                result.append({
                    "id": s.id,
                    "sender": sender_name,
                    "sender_id": s.sender_id,
                    "receiver": receiver_name,
                    "receiver_id": s.receiver_id,
                    "message": s.message,
                    "category": s.category,
                    "department": sender_dept,
                    "points": s.points,
                    "status": s.status,
                    "reactions": reaction_count,
                    "date": s.created_at.strftime("%b %d, %Y") if s.created_at else None,
                    "created_at": s.created_at.isoformat() if s.created_at else None,
                })
            return result
        except Exception as e:
            print(f"Error in get_all_shoutouts: {e}")
            return []

    def get_shoutout_stats(self) -> Dict:
        try:
            total = self.db.query(Shoutout).count()
            approved = self.db.query(Shoutout).filter(Shoutout.status == "APPROVED").count()
            pending = self.db.query(Shoutout).filter(Shoutout.status == "PENDING").count()
            rejected = self.db.query(Shoutout).filter(Shoutout.status == "REJECTED").count()
            total_reactions = self.db.query(Reaction).count()
            return {
                "total": total,
                "approved": approved,
                "pending": pending,
                "rejected": rejected,
                "total_reactions": total_reactions,
            }
        except Exception as e:
            print(f"Error in get_shoutout_stats: {e}")
            return {"total": 0, "approved": 0, "pending": 0, "rejected": 0, "total_reactions": 0}

    def delete_shoutout(self, shoutout_id: int) -> bool:
        try:
            shoutout = self.db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
            if not shoutout:
                return False
            self.db.delete(shoutout)
            self.db.commit()
            return True
        except Exception as e:
            print(f"Error deleting shoutout: {e}")
            self.db.rollback()
            return False

    def approve_shoutout(self, shoutout_id: int) -> bool:
        try:
            shoutout = self.db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
            if not shoutout:
                return False
            shoutout.status = "APPROVED"
            self.db.commit()
            return True
        except Exception as e:
            print(f"Error approving shoutout: {e}")
            self.db.rollback()
            return False

    def reject_shoutout(self, shoutout_id: int) -> bool:
        try:
            shoutout = self.db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
            if not shoutout:
                return False
            shoutout.status = "REJECTED"
            self.db.commit()
            return True
        except Exception as e:
            print(f"Error rejecting shoutout: {e}")
            self.db.rollback()
            return False

    # ─────────────────────────────────────────
    # USERS
    # ─────────────────────────────────────────
    def get_all_users(self, skip: int = 0, limit: int = 200) -> List[Dict]:
        try:
            users = self.db.query(User).offset(skip).limit(limit).all()
            result = []
            for u in users:
                shoutouts_sent = self.db.query(Shoutout).filter(Shoutout.sender_id == u.id).count()
                shoutouts_received = self.db.query(Shoutout).filter(Shoutout.receiver_id == u.id).count()
                result.append({
                    "id": u.id,
                    "name": u.name,
                    "email": u.email,
                    "department": u.department,
                    "role": u.role,
                    "status": u.status,
                    "shoutouts_sent": shoutouts_sent,
                    "shoutouts_received": shoutouts_received,
                })
            return result
        except Exception as e:
            print(f"Error in get_all_users: {e}")
            return []

    # ─────────────────────────────────────────
    # REPORTS
    # ─────────────────────────────────────────
    def get_reports(self, skip: int = 0, limit: int = 100, status: str = None) -> List:
        try:
            query = self.db.query(Report)
            if status and status != "ALL":
                query = query.filter(Report.status == status)
            return query.order_by(Report.created_at.desc()).offset(skip).limit(limit).all()
        except Exception as e:
            print(f"Error in get_reports: {e}")
            return []

    def get_report_stats(self) -> Dict:
        try:
            total = self.db.query(Report).count()
            pending = self.db.query(Report).filter(Report.status == "PENDING").count()
            reviewing = self.db.query(Report).filter(Report.status == "REVIEWING").count()
            resolved = self.db.query(Report).filter(Report.status == "RESOLVED").count()

            resolved_reports = self.db.query(Report).filter(Report.resolved_at.isnot(None)).all()
            avg_seconds = 0
            if resolved_reports:
                total_s = sum((r.resolved_at - r.created_at).total_seconds() for r in resolved_reports)
                avg_seconds = total_s / len(resolved_reports)

            def fmt(s):
                if s < 60:
                    return f"{int(s)}s"
                if s < 3600:
                    return f"{int(s // 60)}m"
                return f"{int(s // 3600)}h"

            return {
                "total": total,
                "pending": pending,
                "reviewing": reviewing,
                "resolved": resolved,
                "avg_response_time": fmt(avg_seconds),
            }
        except Exception as e:
            print(f"Error in get_report_stats: {e}")
            return {"total": 0, "pending": 0, "reviewing": 0, "resolved": 0, "avg_response_time": "0s"}

    def resolve_report(self, report_id: int) -> bool:
        try:
            report = self.db.query(Report).filter(Report.id == report_id).first()
            if not report:
                return False
            report.status = "RESOLVED"
            report.resolved_at = datetime.utcnow()
            self.db.commit()
            return True
        except Exception as e:
            print(f"Error resolving report: {e}")
            self.db.rollback()
            return False
