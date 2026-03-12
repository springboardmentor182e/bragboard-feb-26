from fastapi import APIRouter
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fe9b7421 (add leaderboard feature)
from src.users.controller import router as users_router
from src.auth.controller import router as auth_router

router = APIRouter()

router.include_router(users_router, prefix="/users", tags=["Users"])
router.include_router(auth_router, prefix="/auth", tags=["Auth"])

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
<<<<<<< HEAD
=======
=======

from .user_router import router as user_router
from .shoutout_router import router as shoutout_router
from .leaderboard.router import router as leaderboard_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(user_router)
api_router.include_router(shoutout_router)
api_router.include_router(leaderboard_router)
>>>>>>> 99816ec1 (Fix leaderboard routing and UI improvements)
>>>>>>> fe9b7421 (add leaderboard feature)
