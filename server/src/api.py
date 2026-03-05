from fastapi import APIRouter

from .user_router import router as user_router
from .shoutout_router import router as shoutout_router
from .leaderboard.router import router as leaderboard_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(user_router)
api_router.include_router(shoutout_router)
api_router.include_router(leaderboard_router)
