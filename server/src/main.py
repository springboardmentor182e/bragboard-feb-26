from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .dashboard.controller import router as dashboard_router

app = FastAPI(
    title="Employee Dashboard API",
    description="Backend API for Employee Recognition Dashboard",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include dashboard routes
app.include_router(dashboard_router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to Employee Dashboard API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}

