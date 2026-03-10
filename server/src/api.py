from fastapi import APIRouter
from src.users.controller import router as users_router
from src.auth.controller import router as auth_router

router = APIRouter()

router.include_router(users_router, prefix="/users", tags=["Users"])
router.include_router(auth_router, prefix="/auth", tags=["Auth"])

