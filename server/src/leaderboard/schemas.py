from pydantic import BaseModel
from typing import Optional


class LeaderboardUser(BaseModel):
    rank: int
    id: int
    name: str
    department: str
    photo_url: Optional[str]
    points: int

    class Config:
        from_attributes = True   # For SQLAlchemy compatibility