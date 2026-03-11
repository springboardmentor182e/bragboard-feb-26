from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from . import models
from .service_new import dashboard_service

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


# ==================== Team Members Routes ====================
@router.get("/users", response_model=List[models.User])
async def get_users(
    department: Optional[str] = Query(None, alias="department"),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """Get all team members, optionally filtered by department or search query"""
    if search:
        users = dashboard_service.search_users(db, search)
    elif department:
        users = dashboard_service.get_users_by_department(db, department)
    else:
        users = dashboard_service.get_all_users(db)
    
    return [models.User.model_validate(user) for user in users]


@router.get("/users/{user_id}", response_model=models.User)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get a specific user by ID"""
    user = dashboard_service.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return models.User.model_validate(user)


@router.patch("/users/{user_id}", response_model=models.User)
async def update_user(user_id: int, user_update: models.UserUpdate, db: Session = Depends(get_db)):
    """Update a user's information"""
    update_data = user_update.model_dump(exclude_unset=True)
    user = dashboard_service.update_user(db, user_id, update_data)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return models.User.model_validate(user)


# ==================== Badges Routes ====================
@router.get("/badges", response_model=List[models.Badge])
async def get_badges(db: Session = Depends(get_db)):
    """Get all available badges"""
    badges = dashboard_service.get_all_badges(db)
    return [models.Badge.model_validate(badge) for badge in badges]


@router.get("/badges/{badge_id}", response_model=models.Badge)
async def get_badge(badge_id: int, db: Session = Depends(get_db)):
    """Get a specific badge by ID"""
    badge = dashboard_service.get_badge_by_id(db, badge_id)
    if not badge:
        raise HTTPException(status_code=404, detail="Badge not found")
    return models.Badge.model_validate(badge)


# ==================== Shoutouts Routes ====================
@router.get("/shoutouts", response_model=List[models.Shoutout])
async def get_shoutouts(db: Session = Depends(get_db)):
    """Get all shoutouts"""
    shoutouts = dashboard_service.get_all_shoutouts(db)
    return [_shoutout_db_to_model(shoutout) for shoutout in shoutouts]


@router.get("/shoutouts/{shoutout_id}", response_model=models.Shoutout)
async def get_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    """Get a specific shoutout by ID"""
    shoutout = dashboard_service.get_shoutout_by_id(db, shoutout_id)
    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return _shoutout_db_to_model(shoutout)


@router.post("/shoutouts", response_model=models.Shoutout)
async def create_shoutout(shoutout: models.ShoutoutCreate, db: Session = Depends(get_db)):
    """Create a new shoutout"""
    try:
        # For now, using sender_id=1 as default, can be updated to use authenticated user
        new_shoutout = dashboard_service.create_shoutout(
            db,
            sender_id=1,
            recipient_id=shoutout.recipient_id,
            badge_id=shoutout.badge_id,
            message=shoutout.message
        )
        return _shoutout_db_to_model(new_shoutout)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/shoutouts/{shoutout_id}/react")
async def add_reaction(
    shoutout_id: int,
    reaction_type: str = Query(..., alias="reaction"),
    user_id: int = Query(1),  # Default to user 1 for now
    db: Session = Depends(get_db)
):
    """Add or toggle a reaction to a shoutout"""
    valid_reactions = ["heart", "thumbs_up", "star", "comment"]
    if reaction_type not in valid_reactions:
        raise HTTPException(status_code=400, detail=f"Invalid reaction type. Must be one of: {valid_reactions}")
    
    shoutout = dashboard_service.add_reaction(db, shoutout_id, user_id, reaction_type)
    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return _shoutout_db_to_model(shoutout)


@router.post("/shoutouts/{shoutout_id}/comments", response_model=models.Shoutout)
async def add_comment(
    shoutout_id: int,
    comment: models.CommentCreate,
    db: Session = Depends(get_db)
):
    """Add a comment to a shoutout"""
    # For now, using author_id=1 as default, can be updated to use authenticated user
    shoutout = dashboard_service.add_comment(db, shoutout_id, author_id=1, text=comment.text)
    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return _shoutout_db_to_model(shoutout)


@router.delete("/shoutouts/{shoutout_id}", status_code=204)
async def delete_shoutout(shoutout_id: int, user_id: int = Query(...), db: Session = Depends(get_db)):
    """Delete a shoutout if it belongs to requesting user"""
    deleted = dashboard_service.delete_shoutout(db, shoutout_id, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Shoutout not found or not allowed")
    return


@router.delete("/shoutouts/{shoutout_id}/comments/{comment_id}", status_code=204)
async def delete_comment(shoutout_id: int, comment_id: int, db: Session = Depends(get_db)):
    """Delete a comment from a shoutout"""
    shoutout = dashboard_service.delete_comment(db, shoutout_id, comment_id)
    if not shoutout:
        raise HTTPException(status_code=404, detail="Comment not found")
    return


# ==================== Notifications Routes ====================
@router.get("/notifications", response_model=List[models.Notification])
async def get_notifications(db: Session = Depends(get_db)):
    """Get all notifications"""
    notifications = dashboard_service.get_all_notifications(db)
    return [models.Notification.model_validate(notif) for notif in notifications]


@router.post("/notifications/{notification_id}/read", response_model=models.Notification)
async def mark_notification_read(notification_id: int, db: Session = Depends(get_db)):
    """Mark a notification as read"""
    notification = dashboard_service.mark_notification_read(db, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return models.Notification.model_validate(notification)


@router.post("/notifications/read-all")
async def mark_all_notifications_read(db: Session = Depends(get_db)):
    """Mark all notifications as read"""
    notifications = dashboard_service.mark_all_notifications_read(db)
    return [models.Notification.model_validate(notif) for notif in notifications]


# ==================== Activities Routes ====================
@router.get("/activities", response_model=List[models.Activity])
async def get_activities(db: Session = Depends(get_db)):
    """Get all recent activities"""
    activities = dashboard_service.get_all_activities(db)
    return [
        models.Activity(
            id=activity.id,
            user_id=activity.user_id,
            text=activity.text,
            time_ago=_get_time_ago(activity.created_at)
        )
        for activity in activities
    ]


@router.delete("/activities/{activity_id}", status_code=204)
async def delete_activity(activity_id: int, user_id: int = Query(...), db: Session = Depends(get_db)):
    """Delete a user activity if it belongs to the user"""
    deleted = dashboard_service.delete_activity(db, activity_id, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Activity not found or not allowed")
    return


# ==================== Analytics Routes ====================
@router.get("/analytics/metrics", response_model=List[models.AnalyticsMetric])
async def get_analytics_metrics(db: Session = Depends(get_db)):
    """Get analytics metrics"""
    metrics_data = dashboard_service.get_analytics_metrics(db)
    
    return [
        models.AnalyticsMetric(
            label="Total Shout-Outs",
            value=str(metrics_data["total_shoutouts"]),
            trend="+12%",
            icon_key="shoutouts",
            card_variant="purple"
        ),
        models.AnalyticsMetric(
            label="Total Reactions",
            value=str(metrics_data["total_reactions"]),
            trend="+18%",
            icon_key="reactions",
            card_variant="pink"
        ),
        models.AnalyticsMetric(
            label="Active Users",
            value=str(metrics_data["active_users"]),
            trend="+8%",
            icon_key="users",
            card_variant="green"
        ),
    ]


@router.get("/analytics/top-contributors", response_model=List[models.TopContributor])
async def get_top_contributors(db: Session = Depends(get_db)):
    """Get top contributors for charts"""
    contributors = dashboard_service.get_top_contributors(db)
    return [models.TopContributor(**c) for c in contributors]


@router.get("/analytics/department-engagement", response_model=List[models.DepartmentEngagement])
async def get_department_engagement(db: Session = Depends(get_db)):
    """Get department engagement data"""
    engagement = dashboard_service.get_department_engagement(db)
    return [models.DepartmentEngagement(**e) for e in engagement]


# ==================== Leaderboard Routes ====================
@router.get("/leaderboard/stats", response_model=List[models.LeaderboardStat])
async def get_leaderboard_stats(db: Session = Depends(get_db)):
    """Get leaderboard statistics"""
    stats_data = dashboard_service.get_leaderboard_stats(db)
    
    return [
        models.LeaderboardStat(
            label="Top Score",
            value=str(stats_data["top_score"]),
            sub="Jessica Park",
            variant="yellow"
        ),
        models.LeaderboardStat(
            label="Total Badges",
            value=str(stats_data["total_badges"]),
            sub="Awarded this month",
            variant="gray"
        ),
        models.LeaderboardStat(
            label="Growth",
            value="+24%",
            sub="vs last month",
            variant="green"
        ),
    ]


@router.get("/leaderboard/top-performers", response_model=List[models.TopPerformer])
async def get_top_performers(db: Session = Depends(get_db)):
    """Get top 3 performers (podium)"""
    performers = dashboard_service.get_top_performers(db, limit=3)
    result = []
    for idx, performer in enumerate(performers, 1):
        result.append(
            models.TopPerformer(
                rank=idx,
                name=performer.name,
                score=performer.points,
                department=performer.department,
                badges=performer.stars
            )
        )
    return result


@router.get("/leaderboard/rankings", response_model=List[models.FullRanking])
async def get_full_rankings(db: Session = Depends(get_db)):
    """Get full leaderboard rankings"""
    rankings = dashboard_service.get_full_rankings(db)
    return [models.FullRanking(**rank) for rank in rankings]


@router.get("/leaderboard/user/{user_id}", response_model=models.FullRanking)
async def get_user_rank(user_id: int, db: Session = Depends(get_db)):
    """Get a specific user's rank"""
    rank = dashboard_service.get_user_rank(db, user_id)
    if not rank:
        raise HTTPException(status_code=404, detail="User not found or not in leaderboard")
    return models.FullRanking(**rank)


# ==================== Campaign Routes ====================
@router.get("/campaigns", response_model=List[models.Campaign])
async def get_campaigns(db: Session = Depends(get_db)):
    """Get all campaigns"""
    campaigns = dashboard_service.get_all_campaigns(db)
    
    result = []
    for campaign in campaigns:
        result.append(
            models.Campaign(
                id=campaign.id,
                title=campaign.title,
                description=campaign.description,
                progress=campaign.progress,
                participants=campaign.participants,
                ends_in=f"{campaign.ends_in_days} days",
                icon=campaign.icon
            )
        )
    return result


@router.get("/campaigns/{campaign_id}", response_model=models.Campaign)
async def get_campaign(campaign_id: int, db: Session = Depends(get_db)):
    """Get a specific campaign by ID"""
    campaign = dashboard_service.get_campaign_by_id(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    return models.Campaign(
        id=campaign.id,
        title=campaign.title,
        description=campaign.description,
        progress=campaign.progress,
        participants=campaign.participants,
        ends_in=f"{campaign.ends_in_days} days",
        icon=campaign.icon
    )


# ==================== Dashboard Summary ====================
@router.get("/summary")
async def get_dashboard_summary(db: Session = Depends(get_db)):
    """Get a summary of all dashboard data"""
    users = dashboard_service.get_all_users(db)
    badges = dashboard_service.get_all_badges(db)
    shoutouts = dashboard_service.get_all_shoutouts(db)
    metrics = dashboard_service.get_analytics_metrics(db)
    
    return {
        "users": [models.User.model_validate(u) for u in users],
        "badges": [models.Badge.model_validate(b) for b in badges],
        "shoutouts": [_shoutout_db_to_model(s) for s in shoutouts],
        "metrics": metrics,
    }


# ==================== Helper Functions ====================
def _shoutout_db_to_model(shoutout_db) -> models.Shoutout:
    """Convert database shoutout to Pydantic model"""
    # Convert comments
    comments = []
    for comment in shoutout_db.comments:
        comments.append(
            models.Comment(
                id=comment.id,
                author=comment.author.name,
                avatar=comment.author.avatar,
                text=comment.text,
                created_at=comment.created_at
            )
        )
    
    return models.Shoutout(
        id=shoutout_db.id,
        sender_id=shoutout_db.sender_id,
        sender=models.Sender(
            name=shoutout_db.sender.name,
            role=shoutout_db.sender.role,
            avatar=shoutout_db.sender.avatar
        ),
        recipient=models.Recipient(name=shoutout_db.recipient.name),
        badge=models.BadgeInfo(
            emoji=shoutout_db.badge.emoji,
            label=shoutout_db.badge.name
        ),
        message=shoutout_db.message,
        time_ago=_get_time_ago(shoutout_db.created_at),
        reactions=models.Reactions(
            heart=shoutout_db.heart_reactions,
            thumbs_up=shoutout_db.thumbs_up_reactions,
            star=shoutout_db.star_reactions,
            comment=shoutout_db.comment_reactions
        ),
        comments=comments
    )


def _get_time_ago(created_at) -> str:
    """Convert datetime to relative time string"""
    from datetime import datetime
    now = datetime.utcnow()
    diff = now - created_at
    
    if diff.days > 0:
        return f"{diff.days} day{'s' if diff.days > 1 else ''} ago"
    elif diff.seconds > 3600:
        hours = diff.seconds // 3600
        return f"{hours} hour{'s' if hours > 1 else ''} ago"
    elif diff.seconds > 60:
        minutes = diff.seconds // 60
        return f"{minutes} minute{'s' if minutes > 1 else ''} ago"
    else:
        return "Just now"
