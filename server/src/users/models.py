from pydantic import BaseModel, ConfigDict
from typing import Literal


RoleType = Literal["Admin", "Manager", "Employee"]
StatusType = Literal["Active", "Suspended"]


# Base schema (shared fields)
class UserBase(BaseModel):
    name: str
    email: str
    department: str
    role: RoleType
    status: StatusType


# Schema for creating a user
class UserCreate(UserBase):
    pass


# Schema returned in API responses
class User(UserBase):
    id: int
    model_config = ConfigDict(from_attributes=True)