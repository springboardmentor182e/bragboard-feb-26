from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from . import models
from .service import dashboard_service

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


# Team Members Routes
@router.get("/users", response_model=List[models.User])
async def get_users(
    department: Optional[str] = Query(None, alias="department"),
    search: Optional[str] = Query(None)
):
    """Get all team members, optionally filtered by department or search query"""
    if search:
        return dashboard_service.search_users(search)
    if department:
        return dashboard_service.get_users_by_department(department)
    return dashboard_service.get_all_users()


@router.get("/users/{user_id}", response_model=models.User)
async def get_user(user_id: int):
    """Get a specific user by ID"""
    user = dashboard_service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/users/{user_id}", response_model=models.User)
async def update_user(user_id: int, user_update: models.UserUpdate):
    """Update a user's information"""
    update_data = user_update.model_dump(exclude_unset=True)
    user = dashboard_service.update_user(user_id, update_data)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Badges Routes
@router.get("/badges", response_model=List[models.Badge])
async def get_badges():
    """Get all available badges"""
    return dashboard_service.get_all_badges()


@router.get("/badges/{badge_id}", response_model=models.Badge)
async def get_badge(badge_id: int):
    """Get a specific badge by ID"""
    badge = dashboard_service.get_badge_by_id(badge_id)
    if not badge:
        raise HTTPException(status_code=404, detail="Badge not found")
    return badge


# Shoutouts Routes
@router.get("/shoutouts", response_model=List[models.Shoutout])
async def get_shoutouts():
    """Get all shoutouts"""
    return dashboard_service.get_all_shoutouts()


@router.get("/shoutouts/{shoutout_id}", response_model=models.Shoutout)
async def get_shoutout(shoutout_id: int):
    """Get a specific shoutout by ID"""
    shoutout = dashboard_service.get_shoutout_by_id(shoutout_id)
    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return shoutout


@router.post("/shoutouts", response_model=models.Shoutout)
async def create_shoutout(shoutout: models.ShoutoutCreate):
    """Create a new shoutout"""
    try:
        return dashboard_service.create_shoutout(
            sender_id=1,  # Currently using default sender
            recipient_id=shoutout.recipient_id,
            badge_id=shoutout.badge_id,
            message=shoutout.message
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/shoutouts/{shoutout_id}/react")
async def add_reaction(shoutout_id: int, reaction_type: str = Query(..., alias="reaction")):
    """Add a reaction to a shoutout"""
    valid_reactions = ["heart", "thumbs_up", "star", "comment"]
    if reaction_type not in valid_reactions:
        raise HTTPException(status_code=400, detail=f"Invalid reaction type. Must be one of: {valid_reactions}")
    
    shoutout = dashboard_service.add_reaction(shoutout_id, reaction_type)
    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return shoutout


# Notifications Routes
@router.get("/notifications", response_model=List[models.Notification])
async def get_notifications():
    """Get all notifications"""
    return dashboard_service.get_all_notifications()


@router.post("/notifications/{notification_id}/read", response_model=models.Notification)
async def mark_notification_read(notification_id: int):
    """Mark a notification as read"""
    notification = dashboard_service.mark_notification_read(notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification


@router.post("/notifications/read-all")
async def mark_all_notifications_read():
    """Mark all notifications as read"""
    return dashboard_service.mark_all_notifications_read()


# Activities Routes
@router.get("/activities", response_model=List[models.Activity])
async def get_activities():
    """Get all recent activities"""
    return dashboard_service.get_all_activities()


# Analytics Routes
@router.get("/analytics/metrics", response_model=List[models.AnalyticsMetric])
async def get_analytics_metrics():
    """Get analytics metrics"""
    return dashboard_service.get_analytics_metrics()


@router.get("/analytics/top-contributors", response_model=List[models.TopContributor])
async def get_top_contributors():
    """Get top contributors for charts"""
    return dashboard_service.get_top_contributors()


@router.get("/analytics/department-engagement", response_model=List[models.DepartmentEngagement])
async def get_department_engagement():
    """Get department engagement data"""
    return dashboard_service.get_department_engagement()


# Leaderboard Routes
@router.get("/leaderboard/stats", response_model=List[models.LeaderboardStat])
async def get_leaderboard_stats():
    """Get leaderboard statistics"""
    return dashboard_service.get_leaderboard_stats()


@router.get("/leaderboard/top-performers", response_model=List[models.TopPerformer])
async def get_top_performers():
    """Get top 3 performers (podium)"""
    return dashboard_service.get_top_performers()


@router.get("/leaderboard/rankings", response_model=List[models.FullRanking])
async def get_full_rankings():
    """Get full leaderboard rankings"""
    return dashboard_service.get_full_rankings()


@router.get("/leaderboard/user/{user_id}", response_model=models.FullRanking)
async def get_user_rank(user_id: int):
    """Get a specific user's rank"""
    rank = dashboard_service.get_user_rank(user_id)
    if not rank:
        raise HTTPException(status_code=404, detail="User not found or not in leaderboard")
    return rank


# Campaign Routes
@router.get("/campaigns", response_model=List[models.Campaign])
async def get_campaigns():
    """Get all campaigns"""
    return dashboard_service.get_all_campaigns()


@router.get("/campaigns/{campaign_id}", response_model=models.Campaign)
async def get_campaign(campaign_id: int):
    """Get a specific campaign by ID"""
    campaign = dashboard_service.get_campaign_by_id(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign


# Dashboard Summary (combines multiple endpoints)
@router.get("/summary")
async def get_dashboard_summary():
    """Get a summary of all dashboard data"""
    return {
        "users": dashboard_service.get_all_users(),
        "badges": dashboard_service.get_all_badges(),
        "shoutouts": dashboard_service.get_all_shoutouts(),
        "notifications": dashboard_service.get_all_notifications(),
        "activities": dashboard_service.get_all_activities(),
        "analytics_metrics": dashboard_service.get_analytics_metrics(),
        "leaderboard_stats": dashboard_service.get_leaderboard_stats(),
        "top_performers": dashboard_service.get_top_performers(),
        "campaigns": dashboard_service.get_all_campaigns(),
    }

