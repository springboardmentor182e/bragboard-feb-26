from pydantic import BaseModel
from typing import Dict, Optional

class BadgeSchema(BaseModel):
    label: str

class ReactionsSchema(BaseModel):
    hearts: int
    claps: int
    stars: int
    comments: int

class ShoutoutBase(BaseModel):
    author: str
    recipient: str
    department: str
    message: str
    badge: BadgeSchema
    reactions: ReactionsSchema
    status: str
    date: str

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
