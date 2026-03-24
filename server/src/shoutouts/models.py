<<<<<<< HEAD
from flask_sqlalchemy import SQLAlchemy
=======
from pydantic import BaseModel
from typing import Dict, Optional, List
>>>>>>> ca8e3839491ef5dd39f3e81410cdbf583e55e0c2

db = SQLAlchemy()

class Report(db.Model):
    __tablename__ = "report"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    reporter = db.Column(db.String(100))
    reported_user = db.Column(db.String(100))
    status = db.Column(db.String(50), default="PENDING")
    priority = db.Column(db.String(50), default="LOW")
    category = db.Column(db.String(100))
    content = db.Column(db.Text)

<<<<<<< HEAD
    # ✅ THIS WAS MISSING (VERY IMPORTANT)
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "reporter": self.reporter,
            "reported_user": self.reported_user,
            "status": self.status,
            "priority": self.priority,
            "category": self.category,
            "content": self.content,
        }
=======
class ShoutoutCreate(ShoutoutBase):
    pass


class ShoutoutUpdate(BaseModel):
    author: Optional[str] = None
    recipient: Optional[str] = None
    department: Optional[str] = None
    message: Optional[str] = None
    badge: Optional[BadgeSchema] = None
    reactions: Optional[ReactionsSchema] = None
    status: Optional[str] = None
    date: Optional[str] = None


class Shoutout(ShoutoutBase):
    id: int

    class Config:
        from_attributes = True

class MyShoutoutsResponse(BaseModel):
    given: List[Shoutout]
    received: List[Shoutout]
>>>>>>> ca8e3839491ef5dd39f3e81410cdbf583e55e0c2
