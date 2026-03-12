from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/")
def root():
    return {"message": "FastAPI Backend Running 🚀"}