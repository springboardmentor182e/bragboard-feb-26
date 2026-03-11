from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any

from ..database import get_db
from ..core.response import success_response
from .service import get_leaderboard_service


router = APIRouter(
    prefix="/leaderboard",
    tags=["Leaderboard"]
)


@router.get("/", response_model=Dict[str, Any])
def get_leaderboard(db: Session = Depends(get_db)):
    """
    Fetch leaderboard data.

    Returns a list of users sorted by points in descending order.
    """

    leaderboard = get_leaderboard_service(db)

    return success_response(
        data=leaderboard,
        message="Leaderboard fetched successfully"
    )