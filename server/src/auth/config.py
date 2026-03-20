from datetime import timedelta

SECRET_KEY = "supersecretkey123"
import os
from datetime import timedelta

# Pehle environment variable se try karo, nahi to default use karo
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey123")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60