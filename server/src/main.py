from fastapi import FastAPI
from pydantic import BaseModel
from src.auth.jwt_handler import create_access_token
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS FIX
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    email: str
    password: str


@app.post("/register")
def register(user: User):
    return {"message": "User Registered"}


@app.post("/login")
def login(user: User):
    token = create_access_token({"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }