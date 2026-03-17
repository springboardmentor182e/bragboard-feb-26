<<<<<<< HEAD
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
=======
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.admin.controller import router as admin_router
from src.auth.controller import router as auth_router

from src.database.core import engine
from src.entities.user import Base

app = FastAPI(title="BragBoard API", version="1.0.0")

# Create tables in database
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"],
>>>>>>> feature/employee-management-admin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
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
=======
app.include_router(auth_router)
app.include_router(admin_router)
>>>>>>> feature/employee-management-admin
