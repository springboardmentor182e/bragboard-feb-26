from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from .models import UserRole

class UserBase(BaseModel):
    email: EmailStr
    role: UserRole = UserRole.employee

from pydantic import validator
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: str = "employee"
    
    @validator("role")
    def role_must_be_employee(cls, v):
        return "employee"  # always force employee

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: UserRole

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenRefresh(BaseModel):
    refresh_token: str

class UserResponse(UserBase):
    id: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AuthResponse(BaseModel):
    message: str
    user_id: str
    email: EmailStr
    role: UserRole
