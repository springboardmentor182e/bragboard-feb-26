from fastapi import APIRouter

# Import routers
from src.users.controller import router as users_router   # ✅ CHANGE THIS LINE
from src.auth.controller import router as auth_router
from src.shoutouts.controller import router as shoutout_router
from src.leaderboard.router import router as leaderboard_router
from src.admin.controller import router as admin_router


# Create API router
api_router = APIRouter(prefix="/api/v1")


# Include routers
api_router.include_router(users_router, prefix="/users", tags=["Users"])
api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
api_router.include_router(shoutout_router, prefix="/shoutouts", tags=["Shoutouts"])
api_router.include_router(leaderboard_router, prefix="/leaderboard", tags=["Leaderboard"])
api_router.include_router(admin_router, prefix="/admin", tags=["Admin"])