from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException
from pathlib import Path

from .database.core import engine, Base
from .api import api_router
from .core.response import error_response
from .core.logging import logger


# -------------------------------------------------
# Create FastAPI App
# -------------------------------------------------
app = FastAPI(
    title="BragBoard API",
    description="Professional Employee Recognition System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)


# -------------------------------------------------
# Application Startup & Shutdown Events
# -------------------------------------------------
@app.on_event("startup")
async def startup_event():
    logger.info("🚀 BragBoard API Started")

    # Create database tables
    Base.metadata.create_all(bind=engine)


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("🛑 BragBoard API Stopped")


# -------------------------------------------------
# Global Exception Handlers
# -------------------------------------------------

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.error(f"HTTP Exception: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response(exc.detail),
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(f"Validation Error: {exc.errors()}")
    return JSONResponse(
        status_code=422,
        content=error_response("Validation failed", details=exc.errors()),
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled Exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content=error_response("Internal server error"),
    )


# -------------------------------------------------
# Media Configuration
# -------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_DIR = BASE_DIR / "media"
USERS_MEDIA_DIR = MEDIA_DIR / "users"

USERS_MEDIA_DIR.mkdir(parents=True, exist_ok=True)

app.mount("/media", StaticFiles(directory=str(MEDIA_DIR)), name="media")


# -------------------------------------------------
# CORS Configuration
# -------------------------------------------------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------------------------
# Register API Router
# -------------------------------------------------
app.include_router(api_router)


# -------------------------------------------------
# Health Check Endpoint
# -------------------------------------------------
@app.get("/", tags=["Health"])
def root():
    return {
        "success": True,
        "message": "BragBoard API Running 🚀"
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy"
    }
