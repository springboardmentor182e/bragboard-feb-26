from jose import jwt
from datetime import datetime, timedelta
from src.core.auth import create_access_token

SECRET_KEY = "secret"
ALGORITHM = "HS256"

def create_access_token(data: dict):
    data.update({"exp": datetime.utcnow() + timedelta(minutes=30)})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict):
    data.update({"exp": datetime.utcnow() + timedelta(days=7)})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)