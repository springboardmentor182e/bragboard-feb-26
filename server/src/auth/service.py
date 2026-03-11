import secrets
import string
from datetime import datetime, timedelta
from typing import Optional
from passlib.context import CryptContext
import jwt
from .models import UserCreate, UserRole, UserResponse

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "prackboard-secret-key-change-in-production-2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# In-memory storage for demo (replace with database in production)
users_db: dict[str, dict] = {}
verification_codes: dict[str, str] = {}

# Demo credentials (plain text - will be hashed on first use)
_demo_users_plain = {
    "john.doe@company.com": {
        "id": 1,
        "email": "john.doe@company.com",
        "password": "employee123",
        "role": "employee",
        "is_active": True,
    },
    "admin@prackboard.com": {
        "id": 2,
        "email": "admin@prackboard.com",
        "password": "admin123",
        "role": "admin",
        "is_active": True,
    },
    "admin@gmail.com": {
        "id": 3,
        "email": "admin@gmail.com",
        "password": "password",
        "role": "admin",
        "is_active": True,
    },
}

# Track if demo users are initialized
_demo_initialized = False

def _initialize_demo_users():
    """Lazy initialize demo users with hashed passwords"""
    global _demo_initialized
    if _demo_initialized:
        return
    
    for email, user_data in _demo_users_plain.items():
        users_db[email] = {
            "id": user_data["id"],
            "email": user_data["email"],
            "password": pwd_context.hash(user_data["password"]),
            "role": user_data["role"],
            "is_active": user_data["is_active"],
        }
    _demo_initialized = True


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def generate_verification_code() -> str:
    """Generate a 6-digit verification code"""
    return "".join(secrets.choice(string.digits) for _ in range(6))


def store_verification_code(email: str, code: str) -> None:
    """Store verification code with timestamp"""
    verification_codes[email] = code


def get_verification_code(email: str) -> Optional[str]:
    """Get stored verification code"""
    return verification_codes.get(email)


def clear_verification_code(email: str) -> None:
    """Clear verification code after use"""
    if email in verification_codes:
        del verification_codes[email]


async def register_user(user: UserCreate) -> dict:
    """Register a new user"""
    # Initialize demo users if not already done
    _initialize_demo_users()
    
    # Check if user already exists
    if user.email.lower() in users_db:
        return {
            "success": False,
            "error": "User with this email already exists"
        }
    
    # Create new user
    user_id = len(users_db) + 1
    new_user = {
        "id": user_id,
        "email": user.email.lower(),
        "password": get_password_hash(user.password),
        "role": user.role.value if isinstance(user.role, UserRole) else user.role,
        "is_active": True,
    }
    
    users_db[user.email.lower()] = new_user
    
    return {
        "success": True,
        "user": {
            "id": user_id,
            "email": new_user["email"],
            "role": new_user["role"],
            "is_active": True
        }
    }


async def authenticate_user(email: str, password: str, role: str = "employee") -> dict:
    """Authenticate a user and return JWT token"""
    # Initialize demo users if not already done
    _initialize_demo_users()
    
    email = email.lower()
    
    # Check if user exists
    if email not in users_db:
        return {
            "success": False,
            "error": "Invalid email or password"
        }
    
    user = users_db[email]
    
    # Check if user is active
    if not user.get("is_active", True):
        return {
            "success": False,
            "error": "User account is disabled"
        }
    
    # Verify password
    if not verify_password(password, user["password"]):
        return {
            "success": False,
            "error": "Invalid email or password"
        }
    
    # Check role
    user_role = user.get("role", "employee")
    if role != user_role:
        return {
            "success": False,
            "error": f"Invalid credentials for {role} login"
        }
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user["email"], "role": user_role}
    )
    
    return {
        "success": True,
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "role": user_role,
            "is_active": True
        }
    }


async def forgot_password(email: str) -> dict:
    """Generate and store verification code for password reset"""
    email = email.lower()
    
    # Check if user exists
    if email not in users_db:
        # Don't reveal if user exists or not
        return {
            "success": True,
            "message": "If the email exists, a verification code will be sent"
        }
    
    # Generate verification code
    code = generate_verification_code()
    store_verification_code(email, code)
    
    # In production, send email with code
    # For demo, log to console
    print(f"\n{'='*50}")
    print(f"PASSWORD RESET VERIFICATION CODE")
    print(f"{'='*50}")
    print(f"Email: {email}")
    print(f"Code: {code}")
    print(f"{'='*50}\n")
    
    return {
        "success": True,
        "message": "Verification code sent to your email"
    }


async def verify_reset_code(email: str, code: str) -> dict:
    """Verify the reset code"""
    email = email.lower()
    
    stored_code = get_verification_code(email)
    
    if not stored_code:
        return {
            "success": False,
            "error": "Invalid or expired verification code"
        }
    
    if stored_code != code:
        return {
            "success": False,
            "error": "Invalid verification code"
        }
    
    return {
        "success": True,
        "message": "Code verified successfully"
    }


async def reset_password(email: str, new_password: str) -> dict:
    """Reset user password"""
    email = email.lower()
    
    if email not in users_db:
        return {
            "success": False,
            "error": "User not found"
        }
    
    # Update password
    users_db[email]["password"] = get_password_hash(new_password)
    
    # Clear verification code
    clear_verification_code(email)
    
    return {
        "success": True,
        "message": "Password reset successfully"
    }


async def get_user_by_email(email: str) -> Optional[dict]:
    """Get user by email"""
    email = email.lower()
    return users_db.get(email)

