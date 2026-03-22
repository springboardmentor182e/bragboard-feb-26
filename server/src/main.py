import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.core import engine, Base
from .entities.shoutout import ShoutoutEntity
from .shoutouts.controller import router as shoutouts_router
from .my_shoutouts.router import router as my_shoutouts_router
from .interactions.router import router as interactions_router

from src.database import Base, engine
from src.routes import auth, shoutout

app = FastAPI()

# ✅ CORS (fix network error)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ create tables
Base.metadata.create_all(bind=engine)
app.include_router(leaderboard_router)
app.include_router(shoutouts_router)
app.include_router(my_shoutouts_router)
app.include_router(interactions_router)

# ✅ include routes
app.include_router(auth.router)
app.include_router(shoutout.router)