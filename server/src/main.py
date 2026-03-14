from fastapi import FastAPI
from pydantic import BaseModel
from src.auth.jwt_handler import create_access_token

app = FastAPI()

class User(BaseModel):

    email:str
    password:str


@app.post("/register")

def register(user:User):

    return {"message":"User Registered"}


@app.post("/login")

def login(user:User):

    token = create_access_token({"sub":user.email})

    return {
        "access_token":token,
        "token_type":"bearer"
    }