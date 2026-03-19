from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum


class UserRole(str, Enum):
    employee = "employee"
    admin = "admin"


class UserBase(BaseModel):
    email: EmailStr
    role: UserRole = UserRole.employee


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: UserRole = UserRole.employee


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class VerifyCodeRequest(BaseModel):
    email: EmailStr
    code: str


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    new_password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Optional[UserBase] = None


class UserResponse(UserBase):
    id: int
    is_active: bool = True

    class Config:
        from_attributes = True

