from pydantic import BaseModel, EmailStr
from datetime import datetime


class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# 🔐 PASSWORD RESET MODELS
class ForgotPasswordRequest(BaseModel):
    email: str

class VerifyOTPRequest(BaseModel):
    email: str
    otp: str

class ResetPasswordRequest(BaseModel):
    email: str
    otp: str
    new_password: str

class OTPResponse(BaseModel):
    message: str
    otp_expires: int  # seconds until expiry