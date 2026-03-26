from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from src.database.core import get_db
from .schemas import LeaderboardUser, BadgeRequest, BadgeResponse
from .service import get_leaderboard_service, award_badge_service


router = APIRouter(
    prefix="/employees",
    tags=["Leaderboard"]
)


# ==============================
# ✅ GET LEADERBOARD
# ==============================
@router.get("/leaderboard", response_model=List[LeaderboardUser])
def get_leaderboard(db: Session = Depends(get_db)):
    leaderboard = get_leaderboard_service(db)
    return leaderboard


# ==============================
# ✅ AWARD BADGE
# ==============================
@router.patch("/{user_id}/badges", response_model=BadgeResponse)
def award_badge(user_id: int, body: BadgeRequest, db: Session = Depends(get_db)):
    user = award_badge_service(db, user_id, body.badge_type)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return BadgeResponse(
        message="Badge awarded successfully",
        user_id=user.id,
        badge_type=body.badge_type
    )