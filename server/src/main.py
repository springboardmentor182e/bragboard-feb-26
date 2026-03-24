from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from auth.controller import router as auth_router
from routes.brag import router as brag_router
from src.routes.leaderboard import router as leaderboard_router
from routes.employee import router as employee_router  # added missing employee router

app = FastAPI(
    title="PrackBoard API",
    description="Backend API for PrackBoard application",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(brag_router, prefix="/brag", tags=["Brag"])
app.include_router(leaderboard_router, prefix="/leaderboard", tags=["Leaderboard"])
app.include_router(employee_router, prefix="/employee", tags=["Employee"])  # added missing

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "Welcome to PrackBoard API",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Health check endpoint
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Leaderboard API Running"
    }
