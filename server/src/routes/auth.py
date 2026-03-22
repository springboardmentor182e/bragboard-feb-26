from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.schemas.user import LoginSchema
from src.core.auth import create_access_token, create_refresh_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login")
def login(data: LoginSchema):
    # ⚠️ For now simple login (no DB check)
    access = create_access_token({"sub": data.username})
    refresh = create_refresh_token({"sub": data.username})

    return {
        "access_token": access,
        "refresh_token": refresh
    }

# ✅ REFRESH ROUTE (Paste here)
@router.post("/refresh")
def refresh(token: str):
    new_access = create_access_token({"sub": token})
    return {"access_token": new_access}