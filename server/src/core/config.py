import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "BragBoard API"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./bragboard.db")

settings = Settings()