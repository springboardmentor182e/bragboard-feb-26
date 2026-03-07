from fastapi import APIRouter
from .shoutouts.controller import router as shoutout_router

api_router = APIRouter()
api_router.include_router(shoutout_router)