from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.models.shoutout import Shoutout

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ CREATE SHOUTOUT
@router.post("/shoutout")
def create_shoutout(data: dict, db: Session = Depends(get_db)):
    shout = Shoutout(**data)
    db.add(shout)
    db.commit()
    return {"message": "Shoutout created"}

# ✅ GET SHOUTOUTS
@router.get("/shoutouts")
def get_shoutouts(db: Session = Depends(get_db)):
    return db.query(Shoutout).all()