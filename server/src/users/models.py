from pydantic import BaseModel
from typing import Literal

class User(BaseModel):
    id: int
    name: str
    email: str
    department: str
    role: Literal["Admin", "Manager", "Employee"]
    status: Literal["Active", "Suspended"]