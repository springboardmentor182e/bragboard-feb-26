from pydantic import BaseModel
from typing import Literal

RoleType = Literal["Admin", "Manager", "Employee"]
StatusType = Literal["Active", "Suspended"]


class UserBase(BaseModel):
    name: str
    email: str
    department: str
    role: RoleType
    status: StatusType


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int