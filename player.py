from pydantic import BaseModel

class Player(BaseModel):
    name: str
    score: int