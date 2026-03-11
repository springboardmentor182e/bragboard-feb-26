from typing import List, Optional
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from .database_models import (
    UserDB, BadgeDB, ShoutoutDB, CommentDB, UserReactionDB, NotificationDB, ActivityDB, CampaignDB
)


class DashboardService:
    """Service layer for dashboard operations using real database"""
    
    # ==================== Users ====================
    @staticmethod
    def get_all_users(db: Session) -> List[UserDB]:
        """Get all users"""
        return db.query(UserDB).all()
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[UserDB]:
        """Get user by ID"""
        return db.query(UserDB).filter(UserDB.id == user_id).first()
    
    @staticmethod
    def get_users_by_department(db: Session, department: str) -> List[UserDB]:
        """Get users by department"""
        if department == "All Departments":
            return db.query(UserDB).all()
        return db.query(UserDB).filter(UserDB.department == department).all()
    
    @staticmethod
    def search_users(db: Session, query: str) -> List[UserDB]:
        """Search users by name"""
        return db.query(UserDB).filter(
            UserDB.name.ilike(f"%{query}%")
        ).all()
    
    @staticmethod
    def update_user(db: Session, user_id: int, user_update: dict) -> Optional[UserDB]:
        """Update user information"""
        user = db.query(UserDB).filter(UserDB.id == user_id).first()
        if user:
            for key, value in user_update.items():
                if hasattr(user, key) and value is not None:
                    setattr(user, key, value)
            user.updated_at = datetime.utcnow()
            db.commit()
            db.refresh(user)
        return user
    
    # ==================== Badges ====================
    @staticmethod
    def get_all_badges(db: Session) -> List[BadgeDB]:
        """Get all badges"""
        return db.query(BadgeDB).all()
    
    @staticmethod
    def get_badge_by_id(db: Session, badge_id: int) -> Optional[BadgeDB]:
        """Get badge by ID"""
        return db.query(BadgeDB).filter(BadgeDB.id == badge_id).first()
    
    # ==================== Shoutouts ====================
    @staticmethod
    def get_all_shoutouts(db: Session) -> List[ShoutoutDB]:
        """Get all shoutouts, ordered by newest first"""
        return db.query(ShoutoutDB).order_by(desc(ShoutoutDB.created_at)).all()
    
    @staticmethod
    def get_shoutout_by_id(db: Session, shoutout_id: int) -> Optional[ShoutoutDB]:
        """Get shoutout by ID"""
        return db.query(ShoutoutDB).filter(ShoutoutDB.id == shoutout_id).first()
    
    @staticmethod
    def create_shoutout(
        db: Session,
        sender_id: int,
        recipient_id: int,
        badge_id: int,
        message: str
    ) -> ShoutoutDB:
        """Create a new shoutout"""
        sender = db.query(UserDB).filter(UserDB.id == sender_id).first()
        recipient = db.query(UserDB).filter(UserDB.id == recipient_id).first()
        badge = db.query(BadgeDB).filter(BadgeDB.id == badge_id).first()
        
        if not sender or not recipient or not badge:
            raise ValueError("Invalid sender, recipient, or badge")
        
        new_shoutout = ShoutoutDB(
            sender_id=sender_id,
            recipient_id=recipient_id,
            badge_id=badge_id,
            message=message,
            created_at=datetime.utcnow()
        )
        db.add(new_shoutout)
        db.commit()
        db.refresh(new_shoutout)
        
        # Create activity log
        DashboardService.create_activity(
            db,
            sender_id,
            f"{sender.name} gave a shoutout to {recipient.name}"
        )
        
        return new_shoutout
    
    @staticmethod
    def add_reaction(db: Session, shoutout_id: int, user_id: int, reaction_type: str) -> Optional[ShoutoutDB]:
        """Add or remove (toggle) a reaction to a shoutout"""
        shoutout = db.query(ShoutoutDB).filter(ShoutoutDB.id == shoutout_id).first()
        if not shoutout:
            return None
        
        # Check if user already has this reaction
        existing_reaction = db.query(UserReactionDB).filter(
            UserReactionDB.user_id == user_id,
            UserReactionDB.shoutout_id == shoutout_id,
            UserReactionDB.reaction_type == reaction_type
        ).first()
        
        reaction_field = f"{reaction_type}_reactions"
        user = db.query(UserDB).filter(UserDB.id == user_id).first()
        
        if existing_reaction:
            # User already reacted with this type - remove the reaction (toggle off)
            db.delete(existing_reaction)
            if hasattr(shoutout, reaction_field):
                current = getattr(shoutout, reaction_field)
                setattr(shoutout, reaction_field, max(0, current - 1))  # Don't go below 0
        else:
            # User hasn't reacted yet - add the reaction (toggle on)
            new_reaction = UserReactionDB(
                user_id=user_id,
                shoutout_id=shoutout_id,
                reaction_type=reaction_type
            )
            db.add(new_reaction)
            if hasattr(shoutout, reaction_field):
                current = getattr(shoutout, reaction_field)
                setattr(shoutout, reaction_field, current + 1)
            
            # Create activity log only when adding a reaction, not removing
            reaction_emoji = {
                "heart": "❤️",
                "thumbs_up": "👍",
                "star": "⭐"
            }
            emoji = reaction_emoji.get(reaction_type, "👍")
            DashboardService.create_activity(
                db,
                user_id,
                f"{user.name} reacted with {emoji} to a shoutout"
            )
        
        shoutout.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(shoutout)
        return shoutout
    
    @staticmethod
    def add_comment(db: Session, shoutout_id: int, author_id: int, text: str) -> Optional[ShoutoutDB]:
        """Add a comment to a shoutout"""
        shoutout = db.query(ShoutoutDB).filter(ShoutoutDB.id == shoutout_id).first()
        if not shoutout:
            return None
        
        author = db.query(UserDB).filter(UserDB.id == author_id).first()
        
        # Create new comment
        new_comment = CommentDB(
            shoutout_id=shoutout_id,
            author_id=author_id,
            text=text,
            created_at=datetime.utcnow()
        )
        db.add(new_comment)
        
        # Increment comment reaction count
        shoutout.comment_reactions += 1
        shoutout.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(shoutout)
        
        # Create activity log
        DashboardService.create_activity(
            db,
            author_id,
            f"{author.name} commented on a shoutout"
        )
        
        return shoutout

    @staticmethod
    def delete_shoutout(db: Session, shoutout_id: int, user_id: int) -> bool:
        """Delete a shoutout if it belongs to the user"""
        shoutout = db.query(ShoutoutDB).filter(ShoutoutDB.id == shoutout_id).first()
        if not shoutout:
            return False

        if shoutout.sender_id != user_id:
            return False

        db.delete(shoutout)
        db.commit()
        return True

    @staticmethod
    def delete_comment(db: Session, shoutout_id: int, comment_id: int) -> Optional[ShoutoutDB]:
        """Delete a comment from a shoutout and decrement comment count"""
        comment = db.query(CommentDB).filter(
            CommentDB.id == comment_id,
            CommentDB.shoutout_id == shoutout_id
        ).first()
        if not comment:
            return None

        shoutout = db.query(ShoutoutDB).filter(ShoutoutDB.id == shoutout_id).first()
        if shoutout and shoutout.comment_reactions > 0:
            shoutout.comment_reactions -= 1
            shoutout.updated_at = datetime.utcnow()

        db.delete(comment)
        db.commit()

        if shoutout:
            db.refresh(shoutout)

        return shoutout

    # ==================== Notifications ====================
    @staticmethod
    def get_all_notifications(db: Session, user_id: Optional[int] = None) -> List[NotificationDB]:
        """Get all notifications, optionally filtered by user"""
        query = db.query(NotificationDB).order_by(desc(NotificationDB.created_at))
        if user_id:
            query = query.filter(NotificationDB.user_id == user_id)
        return query.all()
    
    @staticmethod
    def mark_notification_read(db: Session, notification_id: int) -> Optional[NotificationDB]:
        """Mark notification as read"""
        notification = db.query(NotificationDB).filter(NotificationDB.id == notification_id).first()
        if notification:
            notification.read = True
            db.commit()
            db.refresh(notification)
        return notification
    
    @staticmethod
    def mark_all_notifications_read(db: Session, user_id: Optional[int] = None) -> List[NotificationDB]:
        """Mark all notifications as read"""
        query = db.query(NotificationDB)
        if user_id:
            query = query.filter(NotificationDB.user_id == user_id)
        query.update({NotificationDB.read: True})
        db.commit()
        
        if user_id:
            return db.query(NotificationDB).filter(NotificationDB.user_id == user_id).all()
        return db.query(NotificationDB).all()
    
    # ==================== Activities ====================
    @staticmethod
    def get_all_activities(db: Session) -> List[ActivityDB]:
        """Get all recent activities"""
        return db.query(ActivityDB).order_by(desc(ActivityDB.created_at)).limit(10).all()
    
    @staticmethod
    def create_activity(db: Session, user_id: int, text: str) -> ActivityDB:
        """Create a new activity record"""
        activity = ActivityDB(
            user_id=user_id,
            text=text,
            created_at=datetime.utcnow()
        )
        db.add(activity)
        db.commit()
        db.refresh(activity)
        return activity

    @staticmethod
    def delete_activity(db: Session, activity_id: int, user_id: int) -> bool:
        """Delete an activity if it belongs to the requesting user"""
        activity = db.query(ActivityDB).filter(ActivityDB.id == activity_id).first()
        if not activity:
            return False
        if activity.user_id != user_id:
            return False

        db.delete(activity)
        db.commit()
        return True
    
    # ==================== Analytics ====================
    @staticmethod
    def get_analytics_metrics(db: Session) -> dict:
        """Calculate analytics metrics from database"""
        total_shoutouts = db.query(func.count(ShoutoutDB.id)).scalar() or 0
        total_reactions = db.query(
            func.sum(
                ShoutoutDB.heart_reactions + 
                ShoutoutDB.thumbs_up_reactions + 
                ShoutoutDB.star_reactions + 
                ShoutoutDB.comment_reactions
            )
        ).scalar() or 0
        active_users = db.query(func.count(UserDB.id)).scalar() or 0
        
        return {
            "total_shoutouts": total_shoutouts,
            "total_reactions": total_reactions,
            "active_users": active_users
        }
    
    @staticmethod
    def get_top_contributors(db: Session, limit: int = 5) -> List[dict]:
        """Get top contributors by shout outs"""
        results = db.query(
            UserDB.name,
            func.count(ShoutoutDB.id).label("shoutout_count")
        ).outerjoin(
            ShoutoutDB, UserDB.id == ShoutoutDB.sender_id
        ).group_by(
            UserDB.id, UserDB.name
        ).order_by(
            desc("shoutout_count")
        ).limit(limit).all()
        
        return [{"name": name, "value": count or 0} for name, count in results]
    
    @staticmethod
    def get_department_engagement(db: Session) -> List[dict]:
        """Get engagement metrics by department"""
        results = db.query(
            UserDB.department,
            func.count(ShoutoutDB.id).label("engagement_count")
        ).outerjoin(
            ShoutoutDB, UserDB.id == ShoutoutDB.sender_id
        ).group_by(
            UserDB.department
        ).all()
        
        # Color mapping for departments
        color_map = {
            "Engineering": "#4F46E5",
            "Design": "#8B5CF6",
            "Marketing": "#F59E0B",
            "Sales": "#10B981",
            "HR": "#F43F5E"
        }
        
        return [
            {
                "name": dept,
                "value": count or 0,
                "color": color_map.get(dept, "#6B7280")
            }
            for dept, count in results
        ]
    
    # ==================== Leaderboard ====================
    @staticmethod
    def get_leaderboard_stats(db: Session) -> dict:
        """Calculate leaderboard statistics"""
        top_score = db.query(func.max(UserDB.points)).scalar() or 0
        total_badges = db.query(func.sum(UserDB.stars)).scalar() or 0
        
        return {
            "top_score": top_score,
            "total_badges": total_badges
        }
    
    @staticmethod
    def get_top_performers(db: Session, limit: int = 3) -> List[UserDB]:
        """Get top 3 performers by points"""
        return db.query(UserDB).order_by(desc(UserDB.points)).limit(limit).all()
    
    @staticmethod
    def get_full_rankings(db: Session) -> List[dict]:
        """Get full leaderboard rankings"""
        users = db.query(UserDB).order_by(desc(UserDB.points)).all()
        
        rankings = []
        for idx, user in enumerate(users, 1):
            rankings.append({
                "rank": idx,
                "name": user.name,
                "department": user.department,
                "points": user.points,
                "badges": user.stars,
                "trend": "up",  # Could be calculated from historical data
                "avatar": user.avatar
            })
        
        return rankings
    
    @staticmethod
    def get_user_rank(db: Session, user_id: int) -> Optional[dict]:
        """Get a specific user's rank"""
        user = db.query(UserDB).filter(UserDB.id == user_id).first()
        if not user:
            return None
        
        # Count how many users have more points
        rank = db.query(func.count(UserDB.id)).filter(
            UserDB.points > user.points
        ).scalar() + 1
        
        return {
            "rank": rank,
            "name": user.name,
            "department": user.department,
            "points": user.points,
            "badges": user.stars,
            "trend": "up",
            "avatar": user.avatar
        }
    
    # ==================== Campaigns ====================
    @staticmethod
    def get_all_campaigns(db: Session) -> List[CampaignDB]:
        """Get all campaigns"""
        return db.query(CampaignDB).order_by(desc(CampaignDB.created_at)).all()
    
    @staticmethod
    def get_campaign_by_id(db: Session, campaign_id: int) -> Optional[CampaignDB]:
        """Get campaign by ID"""
        return db.query(CampaignDB).filter(CampaignDB.id == campaign_id).first()


# Singleton instance
dashboard_service = DashboardService()
