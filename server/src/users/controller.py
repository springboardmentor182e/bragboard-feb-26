from fastapi import APIRouter
from auth.jwt_handler import create_access_token,create_refresh_token

router = APIRouter()

@router.post("/register")
def register(user: dict):

    return {"message":"User registered"}

@router.post("/login")
def login(user: dict):

    access = create_access_token({"sub":user["email"]})
    refresh = create_refresh_token({"sub":user["email"]})

    return {
        "access_token":access,
        "refresh_token":refresh
    }