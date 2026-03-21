from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, Response
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException
from pathlib import Path

from src.database.core import Base, engine
from src.api import api_router
from src.core.response import error_response
from src.core.logging import logger


# ==============================
# Create FastAPI App
# ==============================
app = FastAPI(
    title="BragBoard API",
    description="Professional Employee Recognition System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)


# ==============================
# STARTUP
# ==============================
@app.on_event("startup")
async def startup_event():
    logger.info("🚀 BragBoard API Started")
    Base.metadata.create_all(bind=engine)


# ==============================
# SHUTDOWN
# ==============================
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("🛑 BragBoard API Stopped")


# ==============================
# MEDIA CONFIG (KEEP ABOVE ROUTERS)
# ==============================
BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_DIR = BASE_DIR / "media"
MEDIA_DIR.mkdir(parents=True, exist_ok=True)

app.mount("/media", StaticFiles(directory=str(MEDIA_DIR)), name="media")


# ==============================
# EXCEPTION HANDLERS
# ==============================
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response(exc.detail),
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content=error_response("Validation failed", details=exc.errors()),
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # ✅ VERY IMPORTANT: Allow media files to return normally
    if request.url.path.startswith("/media"):
        return Response(status_code=404)

    return JSONResponse(
        status_code=500,
        content={
            "error": str(exc)
        },
    )


# ==============================
# CORS
# ==============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================
# ROUTERS
# ==============================
app.include_router(api_router)


# ==============================
# ROUTES
# ==============================
@app.get("/")
def root():
    return {"message": "BragBoard API Running 🚀"}


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "BragBoard API is running",
        "docs": "/docs"
    }