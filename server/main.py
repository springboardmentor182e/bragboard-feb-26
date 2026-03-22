from fastapi import FastAPI
from src.database import Base, engine
from src.routes import auth, shoutout

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(auth.router)
app.include_router(shoutout.router)