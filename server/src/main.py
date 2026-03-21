from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.core import Base, engine
from src.shoutouts.controller import router as shoutout_router
from src.api import router
from src.entities import user
from src.entities.comment import Comment
from src.admin.controller import router as admin_router

app = FastAPI(title="BragBoard API")

# Create database tables
Base.metadata.create_all(bind=engine)

# Configure CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(shoutout_router)
app.include_router(router)
app.include_router(admin_router)

@app.get("/")
def root():
    return {
        "message": "BragBoard API is running"
    }

@app.get("/health")
def health():
    return {"status": "ok"}