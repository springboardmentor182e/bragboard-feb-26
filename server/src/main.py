import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.core import engine, Base
from .entities.shoutout import ShoutoutEntity
from .shoutouts.controller import router as shoutouts_router
from .my_shoutouts.router import router as my_shoutouts_router
from .interactions.router import router as interactions_router

app = FastAPI()

# Create the tables in Postgres automatically on startup
Base.metadata.create_all(bind=engine)

# Allow React frontend (Vite runs on 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the new shoutouts module
app.include_router(shoutouts_router)
app.include_router(my_shoutouts_router)
app.include_router(interactions_router)

@app.get("/")
def root():
    return {"message": "FastAPI Backend Running 🚀"}