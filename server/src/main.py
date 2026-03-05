from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.admin.controller import router as admin_router

app = FastAPI(title="BragBoard API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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