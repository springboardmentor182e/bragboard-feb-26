<<<<<<< HEAD
from fastapi import Depends, HTTPException, status
from src.entities.user import User

# TEMPORARY: For testing only - remove this in production!
async def get_current_admin_user():
    # Return a mock admin user for testing
    mock_admin = User(
        id=1,
        email="admin@example.com",
        username="admin",
        full_name="Admin User",
        is_admin=True,
        role="admin"
    )
    return mock_admin

# Comment out the real implementation for now
"""
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Real implementation will go here
    pass

async def get_current_admin_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user
"""
=======
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from src.auth.config import SECRET_KEY, ALGORITHM

security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

def require_admin(user=Depends(get_current_user)):
    if user["role"] != "Admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user
>>>>>>> effb253b84ffe43fe0d6e57bc92b63ad771763a4
