from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database.core import get_db
from . import service, models

router = APIRouter(
    prefix="/api/shoutouts",
    tags=["shoutouts"]
)

@router.get("", response_model=List[models.Shoutout])
def read_shoutouts(db: Session = Depends(get_db)):
    return service.get_shoutouts(db)

@router.post("", response_model=models.Shoutout)
def create_shoutout(shoutout: models.ShoutoutCreate, db: Session = Depends(get_db)):
    return service.create_shoutout(db=db, shoutout=shoutout)

@router.put("/{shoutout_id}", response_model=models.Shoutout)
def update_shoutout(shoutout_id: int, shoutout: models.ShoutoutCreate, db: Session = Depends(get_db)):
    return service.update_shoutout(db=db, shoutout_id=shoutout_id, shoutout=shoutout)

@router.delete("/{shoutout_id}")
def delete_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    service.delete_shoutout(db=db, shoutout_id=shoutout_id)
    return {"message": "Shoutout deleted successfully"}

@router.post("/bulk-delete")
def delete_shoutouts_bulk(shoutout_ids: List[int], db: Session = Depends(get_db)):
    service.delete_shoutouts_bulk(db=db, shoutout_ids=shoutout_ids)
    return {"message": "Shoutouts deleted successfully"}
