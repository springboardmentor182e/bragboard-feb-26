from fastapi import FastAPI
<<<<<<< HEAD
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ FIX CORS (important)
=======
from fastapi.middleware.cors import CORSMiddleware

from src.database.core import engine, Base
from src.leaderboard.controller import router as leaderboard_router
from src.shoutouts.controller import router as shoutouts_router

app = FastAPI(title="Leaderboard")

Base.metadata.create_all(bind=engine)

>>>>>>> b965fc4a7c5ebee34091241f01986483a1400b8f
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
class User(BaseModel):
    email: str
    password: str


@app.get("/")
def home():
    return {"message": "Backend running"}


@app.post("/login")
def login(user: User):
    return {
        "access_token": "test-token",
        "token_type": "bearer"
    }


@app.post("/register")
def register(user: User):
    return {
        "message": "User Registered Successfully ✅"
    }
=======
app.include_router(leaderboard_router)
app.include_router(shoutouts_router)


@app.get("/")
def root():
    return {"message": "FastAPI Backend Running 🚀"}
>>>>>>> b965fc4a7c5ebee34091241f01986483a1400b8f
