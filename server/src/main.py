from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.core import Base, engine
from src.entities import shoutout
from src.shoutouts.router import router
from src.api import router
from src.database.core import Base, engine
from src.entities import user

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(router)
@app.get("/")
def root():
    return {"message": "BragBoard API running 🚀"}

