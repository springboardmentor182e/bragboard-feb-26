from fastapi import FastAPI
from src.routes.leaderboard import router

app = FastAPI()

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Leaderboard API Running"}