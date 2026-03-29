from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# 🔐 HASH PASSWORD
def hash_password(password: str):
    return pwd_context.hash(password)


# 🔍 VERIFY PASSWORD
def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)


# 🎟 CREATE TOKEN
def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return token