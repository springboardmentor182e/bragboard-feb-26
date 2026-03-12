from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException
from pathlib import Path

from src.database.core import Base, engine
from src.entities import shoutout, user
from src.shoutouts.router import router as shoutout_router
from src.admin.controller import router as admin_router
from src.api import router as api_router

from src.core.response import error_response
from src.core.logging import logger

app = FastAPI(title="BragBoard API")

# -------------------------------------------------
# Configure CORS
# -------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# Create tables
# -------------------------------------------------
Base.metadata.create_all(bind=engine)

# -------------------------------------------------
# Include routers
# -------------------------------------------------
app.include_router(shoutout_router)
app.include_router(admin_router)
app.include_router(api_router)

# -------------------------------------------------
# Root endpoint
# -------------------------------------------------
@app.get("/")
def root():
    return {
        "message": "BragBoard API is running",
        "endpoints": {
            "docs": "/docs",
            "admin": "/api/admin"
        }
    }

# -------------------------------------------------
# Health check
# -------------------------------------------------
@app.get("/health")
def health():
    return {"status": "healthy"}