from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from .config import SECRET_KEY, ALGORITHM
from ..database.core import get_db
from sqlalchemy.orm import Session
from ..entities.user import User

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user = db.query(User).filter(User.id == payload["user_id"]).first()

        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return user

    except:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def require_admin(user=Depends(get_current_user)):
    if user.role != "admin":   # 🔥 FIXED
        raise HTTPException(status_code=403, detail="Admin access required")

    return user