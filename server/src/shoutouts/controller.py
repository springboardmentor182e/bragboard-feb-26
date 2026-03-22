from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.shoutouts.service import (
    get_all_shoutouts,
    create_shoutout,
    delete_shoutout,
)

router = APIRouter(prefix="/admin/shoutouts", tags=["Admin Shoutouts"])

@router.get("")
def fetch_shoutouts(db: Session = Depends(get_db)):
    return get_all_shoutouts(db)

@router.post("")
def add_shoutout(data: dict, db: Session = Depends(get_db)):
    return create_shoutout(db, data)

@router.delete("/{shoutout_id}")
def remove_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    return delete_shoutout(db, shoutout_id)