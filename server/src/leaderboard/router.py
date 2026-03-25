from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from src.database.core import get_db   # ✅ FIXED import
from .schemas import LeaderboardUser
from .service import get_leaderboard_service


router = APIRouter(
    prefix="/employees",   # ✅ IMPORTANT (match frontend)
    tags=["Leaderboard"]
)


# ==============================
# ✅ GET LEADERBOARD
# ==============================
@router.get("/leaderboard", response_model=List[LeaderboardUser])
def get_leaderboard(db: Session = Depends(get_db)):
    
    leaderboard = get_leaderboard_service(db)

    return leaderboard   # ✅ RETURN DIRECT ARRAY (NO WRAPPER)