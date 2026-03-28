from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.entities.user import User
from .utils import verify_password, hash_password, create_access_token
from src.services.email import email_service
from datetime import datetime, timedelta
import random
import logging

logger = logging.getLogger(__name__)


# 🔐 LOGIN
# def login_user(data, db: Session):
#     # normalize email
#     email = data.email.strip().lower()

#     user = db.query(User).filter(User.email == email).first()

#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     if not verify_password(data.password, user.password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     token = create_access_token({
#         "user_id": user.id,
#         "role": user.role
#     })

#     return token

def login_user(data, db: Session):
    print("INPUT EMAIL:", data.email)
    print("INPUT PASSWORD:", data.password)

    user = db.query(User).filter(User.email == data.email).first()

    print("USER FROM DB:", user)

    if user:
        print("DB PASSWORD:", user.password)
        print("VERIFY RESULT:", verify_password(data.password, user.password))

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "user_id": user.id,
        "role": user.role
    })

    return token


# 🆕 SIGNUP
def signup_user(data, db: Session):
    email = data.email.strip().lower()

    existing = db.query(User).filter(User.email == email).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        name=data.name.strip(),
        email=email,
        password=hash_password(data.password),
        role="employee",   # default role
        status="active"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({
        "user_id": new_user.id,
        "role": new_user.role
    })

    return token


# 🔐 PASSWORD RESET FUNCTIONS

def send_otp_email(email: str, db: Session):
    """
    Generate OTP, save to DB, and send email
    Returns remaining seconds until expiry
    """
    email = email.strip().lower()
    
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Generate 6-digit OTP
    otp = str(random.randint(100000, 999999))
    
    # Set expiry to 15 minutes from now
    expires = datetime.utcnow() + timedelta(minutes=15)
    
    # Update user with OTP
    user.password_reset_otp = otp
    user.password_reset_expires = expires
    
    db.commit()
    
    # Send email
    email_sent = email_service.send_otp_email(
        recipient_email=user.email,
        otp=otp,
        user_name=user.name
    )
    
    if not email_sent:
        raise HTTPException(status_code=500, detail="Failed to send OTP email")
    
    # Calculate remaining time in seconds
    remaining_seconds = int((expires - datetime.utcnow()).total_seconds())
    
    return {
        "message": "OTP sent to your email",
        "otp_expires": remaining_seconds
    }


def verify_otp(email: str, otp: str, db: Session):
    """
    Verify that OTP is correct and not expired
    """
    email = email.strip().lower()
    
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not user.password_reset_otp:
        raise HTTPException(status_code=400, detail="No OTP generated for this email")
    
    # Check if OTP is expired
    if user.password_reset_expires < datetime.utcnow():
        user.password_reset_otp = None
        user.password_reset_expires = None
        db.commit()
        raise HTTPException(status_code=400, detail="OTP has expired")
    
    # Check if OTP matches
    if user.password_reset_otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    
    return {"message": "OTP verified successfully"}


def reset_password_with_otp(email: str, otp: str, new_password: str, db: Session):
    """
    Reset password after OTP verification
    """
    email = email.strip().lower()
    
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # First verify OTP
    if not user.password_reset_otp:
        raise HTTPException(status_code=400, detail="No OTP generated for this email")
    
    if user.password_reset_expires < datetime.utcnow():
        user.password_reset_otp = None
        user.password_reset_expires = None
        db.commit()
        raise HTTPException(status_code=400, detail="OTP has expired")
    
    if user.password_reset_otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    
    # Password requirements check
    if len(new_password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    
    # Update password and clear OTP
    user.password = hash_password(new_password)
    user.password_reset_otp = None
    user.password_reset_expires = None
    
    db.commit()
    
    logger.info(f"✅ Password reset successfully for {email}")
    
    return {"message": "Password reset successfully"}