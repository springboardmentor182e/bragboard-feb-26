from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..core.response import success_response
from .schemas import LeaderboardUser
from .service import get_leaderboard_service


router = APIRouter(
    prefix="/leaderboard",
    tags=["Leaderboard"]
)


@router.get("/", response_model=dict)
def get_leaderboard(db: Session = Depends(get_db)):

    leaderboard = get_leaderboard_service(db)

    return success_response(
        data=leaderboard,
        message="Leaderboard fetched successfully"
    )