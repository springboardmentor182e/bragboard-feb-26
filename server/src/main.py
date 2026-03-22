from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database import Base, engine
from src.routes import auth, shoutout

app = FastAPI()

# ✅ CORS (fix network error)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ create tables
Base.metadata.create_all(bind=engine)

# ✅ include routes
app.include_router(auth.router)
app.include_router(shoutout.router)