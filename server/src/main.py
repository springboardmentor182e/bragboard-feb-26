from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.core import engine, Base
from src.shoutouts.controller import router as shoutout_router
from src.api import router
from src.entities import user
from src.entities.comment import Comment

app = FastAPI(title="BragBoard API")

# Create tables
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(shoutout_router)
app.include_router(router)

@app.get("/")
def root():
    return {"message": "BragBoard API running"}

@app.get("/health")
def health():
    return {"status": "ok"}