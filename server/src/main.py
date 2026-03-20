from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    email: str
    password: str


@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}


@app.post("/login")
def login(user: User):
    return {
        "access_token": "test-token",
        "token_type": "bearer"
    }