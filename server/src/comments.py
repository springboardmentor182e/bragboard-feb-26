from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from datetime import datetime

from src.database import get_db
from src.models import Comment

router = APIRouter(prefix="/comments", tags=["Comments"])


class CommentCreate(BaseModel):
    shoutout_id: int
    author_id: int
    text: str


class CommentResponse(BaseModel):
    id: int
    shoutout_id: int
    author_id: int
    text: str
    created_at: datetime

    class Config:
        from_attributes = True


@router.post("/", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
def create_comment(data: CommentCreate, db: Session = Depends(get_db)):
    comment = Comment(shoutout_id=data.shoutout_id, author_id=data.author_id, text=data.text)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


@router.get("/shoutout/{shoutout_id}", response_model=List[CommentResponse])
def get_comments_by_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    return db.query(Comment).filter(Comment.shoutout_id == shoutout_id).order_by(Comment.created_at).all()


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(comment)
    db.commit()