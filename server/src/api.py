from fastapi import APIRouter
from .shoutouts.controller import router as shoutout_router

api_router = APIRouter()
api_router.include_router(shoutout_router)
from src.users.controller import router as users_router
from src.auth.controller import router as auth_router

router = APIRouter()

router.include_router(users_router, prefix="/users", tags=["Users"])
router.include_router(auth_router, prefix="/auth", tags=["Auth"])
