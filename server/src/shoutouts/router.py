from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.shoutouts.service import (
    get_all_shoutouts,
    create_shoutout,
    delete_shoutout,
)

router = APIRouter(prefix="/shoutouts", tags=["Shoutouts"])


@router.get("/")
def get_shoutouts(db: Session = Depends(get_db)):
    return get_all_shoutouts(db)


@router.post("/")
def add_shoutout(shoutout: dict, db: Session = Depends(get_db)):
    return create_shoutout(db, shoutout)


@router.delete("/{id}")
def delete(id: int, db: Session = Depends(get_db)):
    return delete_shoutout(db, id)