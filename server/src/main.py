import json
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.core import engine, Base
from .entities.shoutout import ShoutoutEntity
from .shoutouts.controller import router as shoutouts_router

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

# Helper function to read our "JSON database" (kept for reference)
def get_data():
    file_path = os.path.join(os.path.dirname(__file__), "shoutouts.json")
    with open(file_path, "r") as f:
        return json.load(f)

@app.get("/")
def root():
    return {"message": "FastAPI Backend Running 🚀"}