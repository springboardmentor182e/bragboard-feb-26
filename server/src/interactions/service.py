from sqlalchemy.orm import Session
from ..entities.shoutout import ShoutoutEntity
from ..entities.comment import CommentEntity

def add_reaction(db: Session, shoutout_id: int, reaction_type: str):
    shoutout = db.query(ShoutoutEntity).filter(ShoutoutEntity.id == shoutout_id).first()
    if not shoutout:
        return None

    if not shoutout.reactions:
        shoutout.reactions = {}
    
    shoutout.reactions[reaction_type] = shoutout.reactions.get(reaction_type, 0) + 1
    db.commit()
    db.refresh(shoutout)
    return shoutout

def add_comment(db: Session, shoutout_id: int, author: str, message: str):
    shoutout = db.query(ShoutoutEntity).filter(ShoutoutEntity.id == shoutout_id).first()
    if not shoutout:
        return None

    comment = CommentEntity(shoutout_id=shoutout_id, author=author, message=message)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment
