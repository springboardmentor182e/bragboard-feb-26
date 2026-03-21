from pydantic import BaseModel
from typing import Optional


class LeaderboardUser(BaseModel):
    rank: int
    id: int
    full_name: str
    username: str            # ✅ ADD THIS
    email: str               # ✅ ADD THIS
    department: str
    photo_url: Optional[str]
    points: int

    class Config:
        from_attributes = True   # For SQLAlchemy compatibility