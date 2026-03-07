from pydantic import BaseModel


class ShoutoutCreate(BaseModel):
    teammate: str
    badge: str
    campaign: str = ""
    message: str


class ReactionsOut(BaseModel):
    like: int
    star: int
    clap: int


class ShoutoutOut(BaseModel):
    id: int
    teammate: str
    badge: str
    campaign: str | None
    message: str
    points: int
    reactions: ReactionsOut
    createdAt: str

    model_config = {"from_attributes": True}


class StatsOut(BaseModel):
    total_given: int
    total_received: int
    points_earned: int