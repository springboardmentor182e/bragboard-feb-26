import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.core import engine, Base
from .entities.shoutout import ShoutoutEntity
from .shoutouts.controller import router as shoutouts_router
from .my_shoutouts.router import router as my_shoutouts_router
from .interactions.router import router as interactions_router

from src.database.core import engine, Base
from src.leaderboard.controller import router as leaderboard_router
from src.shoutouts.controller import router as shoutouts_router

app = FastAPI(title="Leaderboard")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leaderboard_router)
app.include_router(shoutouts_router)
app.include_router(my_shoutouts_router)
app.include_router(interactions_router)

@app.get("/")
def root():
    return {"message": "FastAPI Backend Running 🚀"}