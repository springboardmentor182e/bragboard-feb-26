from fastapi import APIRouter
from .admin.controller import router as admin_router
from .users.controller import router as users_router
from .auth.controller import router as auth_router
from .reports.controller import router as reports_router
from .shoutouts.controller import router as shoutouts_router, admin_router as shoutouts_admin_router

router = APIRouter()

# Users APIs
router.include_router(users_router, prefix="/users", tags=["Users"])

# Auth APIs
router.include_router(auth_router, prefix="/auth", tags=["Auth"])

# Reports APIs
router.include_router(reports_router, prefix="/reports", tags=["Reports"])

# Shoutouts APIs (both admin and user)
router.include_router(shoutouts_admin_router)
router.include_router(shoutouts_router)

# Admin APIs
router.include_router(admin_router,prefix="/api/admin",tags=["Admin"])
