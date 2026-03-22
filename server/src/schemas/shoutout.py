from pydantic import BaseModel

class ShoutoutSchema(BaseModel):
    message: str
    sender: str
    receiver: str