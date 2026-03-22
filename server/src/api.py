from fastapi import APIRouter

from src.users.controller import router as users_router
from src.auth.controller import router as auth_router
from src.reports.controller import router as reports_router
from src.shoutouts.controller import router as shoutouts_router

router = APIRouter()

# Users APIs
router.include_router(users_router, prefix="/users", tags=["Users"])

# Auth APIs
router.include_router(auth_router, prefix="/auth", tags=["Auth"])

# Reports APIs
router.include_router(reports_router, prefix="/reports", tags=["Reports"])

router.include_router(shoutouts_router)