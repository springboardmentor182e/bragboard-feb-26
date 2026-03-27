from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from src.auth.router import router as auth_router
from src.database import Base, engine
import os
import json

load_dotenv()


app = FastAPI(
    title="BragBoard API",
    description="Full-stack authentication API for BragBoard",
    version="1.0.0"
)

# Create tables
Base.metadata.create_all(bind=engine)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],


)

# Include routers
app.include_router(auth_router)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to BragBoard API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)

