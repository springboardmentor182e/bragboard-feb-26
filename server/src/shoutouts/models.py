from pydantic import BaseModel

class ShoutoutCreate(BaseModel):
    sender: str
    message: str
    department: str
    date: str