from fastapi import APIRouter
from src.users.controller import router as users_router
from src.auth.controller import router as auth_router

router = APIRouter()

router.include_router(users_router, prefix="/users", tags=["Users"])
from src.admin import controller as admin_controller
# Import other controllers as needed

# Create main API router
api_router = APIRouter(prefix="/api")

# Include your admin routes
api_router.include_router(admin_controller.router)

# Include other routers (auth, todos, users, etc.)
# api_router.include_router(auth_controller.router)
# api_router.include_router(todos_controller.router)
router.include_router(auth_router, prefix="/auth", tags=["Auth"])
