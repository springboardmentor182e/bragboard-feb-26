from pydantic import BaseModel, ConfigDict
from typing import Literal, Any


RoleType = Literal["Admin", "Manager", "Employee"]
StatusType = Literal["Active", "Suspended"]
ThemeType = Literal["light", "dark", "system"]
FontSizeType = Literal["small", "medium", "large"]


# ========== USER BASE & RESPONSE SCHEMAS ==========

class UserBase(BaseModel):
    name: str
    email: str
    department: str
    role: RoleType
    status: StatusType


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# ========== USER SETTINGS SCHEMAS ==========

class UserSettingsResponse(BaseModel):
    """All user preference settings for GET /users/me/settings"""
    # Notifications
    email_notifications: bool
    push_notifications: bool
    shoutout_alerts: bool
    comment_alerts: bool
    mention_alerts: bool
    
    # Appearance
    theme: ThemeType
    compact_mode: bool
    font_size: FontSizeType
    
    # Region & Language
    language: str
    timezone: str
    date_format: str
    time_format: str
    week_start: str
    currency: str
    
    # Security
    two_factor_enabled: bool
    session_timeout: int
    login_alerts_enabled: bool
    
    model_config = ConfigDict(from_attributes=True)


class SettingUpdateRequest(BaseModel):
    """Request body for PUT /users/me/settings/{key}"""
    value: Any


class ChangePasswordRequest(BaseModel):
    """Request body for POST /users/me/change-password"""
    old_password: str
    new_password: str


class SettingUpdateResponse(BaseModel):
    """Response for setting update endpoints"""
    success: bool
    updated_field: str
    new_value: Any
    message: str