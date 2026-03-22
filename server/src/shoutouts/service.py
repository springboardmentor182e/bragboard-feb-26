from sqlalchemy.orm import Session
from ..entities.shoutout import ShoutoutEntity
from . import models

def get_shoutouts(db: Session):
    shoutouts = db.query(ShoutoutEntity).order_by(ShoutoutEntity.date.desc()).all()
    for s in shoutouts:
        if s.badge is None:
            s.badge = {"label": ""}
        if s.reactions is None:
            s.reactions = {"hearts": 0, "claps": 0, "stars": 0, "comments": 0}
        elif 'comments' not in s.reactions:
            s.reactions['comments'] = 0
    return shoutouts

def get_shoutout(db: Session, shoutout_id: int):
    return db.query(ShoutoutEntity).filter(ShoutoutEntity.id == shoutout_id).first()

def create_shoutout(db: Session, shoutout: models.ShoutoutCreate):
    db_shoutout = ShoutoutEntity(**shoutout.model_dump())
    db.add(db_shoutout)
    db.commit()
    db.refresh(db_shoutout)
    return db_shoutout

def update_shoutout(db: Session, shoutout_id: int, shoutout: models.ShoutoutUpdate):
    db_shoutout = db.query(ShoutoutEntity).filter(ShoutoutEntity.id == shoutout_id).first()
    if not db_shoutout:
        return None
    
    update_data = shoutout.model_dump(exclude_unset=True)
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
