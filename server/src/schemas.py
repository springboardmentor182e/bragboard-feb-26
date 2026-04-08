from pydantic import BaseModel
from typing import Optional


class LeaderboardUser(BaseModel):
    rank: int
    id: int
    full_name: str   # ✅ FIXED
    username: Optional[str] = None
    email: Optional[str] = None
    department: str
    photo_url: Optional[str] = None
    points: int

    class Config:
        from_attributes = True