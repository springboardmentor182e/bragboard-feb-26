from pydantic import BaseModel

class UserCreate(BaseModel):
    full_name: str
    username: str
    email: str
    password: str
    department: str
    job_title: str

class LoginSchema(BaseModel):
    username: str
    password: str