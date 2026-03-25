from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Literal, Optional

RoleType = Literal["Admin", "Manager", "Employee"]
StatusType = Literal["Active", "Suspended"]

class UserBase(BaseModel):
    name: str
    email: EmailStr
    department: Optional[str] = None
    role: RoleType
    status: StatusType

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True
# src/users/schemas.py mein ye class add karo
class ReportResponse(BaseModel):
    id: int
    post_id: int
    reported_by: int
    reason: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class ActivityLogResponse(BaseModel):
    id: int
    user_id: int
    action: str
    details: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True