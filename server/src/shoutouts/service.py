from sqlalchemy.orm import Session
from ..entities.shoutout import ShoutoutEntity
from . import models

def get_shoutouts(db: Session):
    return db.query(ShoutoutEntity).order_by(ShoutoutEntity.date.desc()).all()

def create_shoutout(db: Session, shoutout: models.ShoutoutCreate):
    db_shoutout = ShoutoutEntity(**shoutout.model_dump())
    db.add(db_shoutout)
    db.commit()
    db.refresh(db_shoutout)
    return db_shoutout

def update_shoutout(db: Session, shoutout_id: int, shoutout: models.ShoutoutCreate):
    db_shoutout = db.query(ShoutoutEntity).filter(ShoutoutEntity.id == shoutout_id).first()
    if not db_shoutout:
        return None
    
    update_data = shoutout.model_dump()
    for key, value in update_data.items():
        setattr(db_shoutout, key, value)
    
    db.commit()
    db.refresh(db_shoutout)
    return db_shoutout

def delete_shoutout(db: Session, shoutout_id: int):
    db_shoutout = db.query(ShoutoutEntity).filter(ShoutoutEntity.id == shoutout_id).first()
    if db_shoutout:
        db.delete(db_shoutout)
        db.commit()
    return db_shoutout

def delete_shoutouts_bulk(db: Session, shoutout_ids: list[int]):
    db.query(ShoutoutEntity).filter(ShoutoutEntity.id.in_(shoutout_ids)).delete(synchronize_session=False)
    db.commit()
