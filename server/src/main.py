from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.core import Base, engine
from src.entities import shoutout
from src.shoutouts.router import router
from src.api import router
from src.database.core import Base, engine
from src.entities import user

app = FastAPI()

# CORS (allow frontend to connect)
from src.admin.controller import router as admin_router

app = FastAPI(title="BragBoard API")

# Configure CORS
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

# Include routers
app.include_router(admin_router)

@app.get("/")
def root():
    return {
        "message": "BragBoard API is running",
        "endpoints": {
            "docs": "/docs",
            "admin": "/api/admin"
        }
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
