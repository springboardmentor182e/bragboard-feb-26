from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ FIX CORS (important)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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