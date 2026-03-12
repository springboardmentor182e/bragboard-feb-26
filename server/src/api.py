from fastapi import APIRouter
from src.users.controller import router as users_router
from src.auth.controller import router as auth_router
from src.admin import controller as admin_controller

router = APIRouter()

router.include_router(users_router, prefix="/users", tags=["Users"])
router.include_router(auth_router, prefix="/auth", tags=["Auth"])

# Create main API router
api_router = APIRouter(prefix="/api")

# Include admin routes
api_router.include_router(admin_controller.router)