from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import os
from .database import engine
from . import models
from .user_router import router as user_router
from .shoutout_router import router as shoutout_router
from .leaderboard_router import router as leaderboard_router

app = FastAPI()

# Create DB tables
models.Base.metadata.create_all(bind=engine)

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_DIR = BASE_DIR / "media"
USERS_MEDIA_DIR = MEDIA_DIR / "users"

USERS_MEDIA_DIR.mkdir(parents=True, exist_ok=True)

# Mount media folder
app.mount("/media", StaticFiles(directory=str(MEDIA_DIR)), name="media")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(user_router)
app.include_router(shoutout_router)
app.include_router(leaderboard_router)


@app.get("/")
def root():
    return {"message": "BragBoard API Running 🚀"}