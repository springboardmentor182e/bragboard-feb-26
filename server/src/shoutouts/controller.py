from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database.core import get_db
from . import service, models

# In a real app, you'd get the current user from a dependency
# For now, we'll use a placeholder
def get_current_user():
    # This user would have an associated role, e.g., 'admin' or 'employee'
    return {"username": "testuser", "role": "admin"} 

router = APIRouter(
    prefix="/api/shoutouts",
    tags=["shoutouts"]
)

@router.get("", response_model=List[models.Shoutout])
def read_shoutouts(db: Session = Depends(get_db)):
    return service.get_shoutouts(db=db)

@router.post("", response_model=models.Shoutout)
def create_shoutout(shoutout: models.ShoutoutCreate, db: Session = Depends(get_db)):
    return service.create_shoutout(db=db, shoutout=shoutout)

@router.put("/{shoutout_id}", response_model=models.Shoutout)
def update_shoutout(shoutout_id: int, shoutout: models.ShoutoutUpdate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_shoutout = service.get_shoutout(db, shoutout_id=shoutout_id)
    if not db_shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    
    if db_shoutout.author != current_user["username"] and current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to update this shoutout")
    
    return service.update_shoutout(db=db, shoutout_id=shoutout_id, shoutout=shoutout)

@router.delete("/{shoutout_id}")
def delete_shoutout(shoutout_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_shoutout = service.get_shoutout(db, shoutout_id=shoutout_id)
    if not db_shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
        
    if db_shoutout.author != current_user["username"] and current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to delete this shoutout")
    
    service.delete_shoutout(db=db, shoutout_id=shoutout_id)
    return {"message": "Shoutout deleted successfully"}

@router.post("/bulk-delete")
def delete_shoutouts_bulk(shoutout_ids: List[int], db: Session = Depends(get_db)):
    service.delete_shoutouts_bulk(db=db, shoutout_ids=shoutout_ids)
    return {"message": "Shoutouts deleted successfully"}
