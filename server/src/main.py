from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException, RequestValidationError

from src.api import router
from src.database.core import Base, engine
from src.entities import user

from src.database.core import engine, Base
import src.entities.shoutout  # noqa: F401

from src.shoutouts.controller import router as shoutouts_router
from src.exceptions import http_exception_handler, validation_exception_handler

app = FastAPI(title="BragBoard API", version="1.0.0")


# Create tables
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)

app.include_router(shoutouts_router)

@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return {"status": "ok"}
