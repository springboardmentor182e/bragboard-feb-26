from pydantic import BaseModel
from typing import Literal

class Reaction(BaseModel):
    reaction: Literal["hearts", "claps", "stars"]

class Comment(BaseModel):
    message: str
