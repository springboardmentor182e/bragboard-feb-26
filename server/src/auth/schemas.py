from pydantic import BaseModel

class UserCreate(BaseModel):
    full_name: str
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str