import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ROUTERS
from src.shoutouts.router import router as shoutout_router
from src.users.controller import router as user_router
from src.achievements import router as achievement_router
from src.leaderboard.router import router as leaderboard_router

app = FastAPI(title="BragBoard API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://bragboard-leaderboard.onrender.com",  # ✅ update this after frontend is deployed
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(shoutout_router, prefix="/api")
app.include_router(user_router, prefix="/api")
app.include_router(achievement_router, prefix="/api")
app.include_router(leaderboard_router, prefix="/api")


@app.get("/")
def read_root():
    return {"message": "API is running 🚀"}