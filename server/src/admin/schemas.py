from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# User schemas for admin
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    is_active: bool = True
    is_admin: bool = False
    role: str = "user"
    department: Optional[str] = None
    position: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    is_active: Optional[bool] = None
    is_admin: Optional[bool] = None
    role: Optional[str] = None
    department: Optional[str] = None
    position: Optional[str] = None

class UserResponse(UserBase):
    id: int
    created_at: datetime
    avatar_url: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

# Dashboard stats schemas
class StatsResponse(BaseModel):
    total_users: int
    active_users_today: int
    total_posts: int
    total_reports: int
    new_users_this_week: int
    admin_count: int

# Report schemas
class ReportBase(BaseModel):
    title: str
    type: str
    content: Dict[str, Any]

class ReportCreate(ReportBase):
    pass

class ReportResponse(ReportBase):
    id: int
    created_by: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Activity log schemas
class ActivityLogResponse(BaseModel):
    id: int
    user_id: int
    username: Optional[str] = None
    action: str
    details: Dict[str, Any]
    timestamp: datetime
    model_config = ConfigDict(from_attributes=True)


# Add this to your schemas.py if needed
class DashboardStatsBase(BaseModel):
    stat_key: str
    stat_value: int
    stat_metadata: Optional[Dict[str, Any]] = None  # Updated field name

class DashboardStatsCreate(DashboardStatsBase):
    pass

class DashboardStatsResponse(DashboardStatsBase):
    id: int
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)


# ========== ADMIN SETTINGS SCHEMAS ==========

class AdminSettingsResponse(BaseModel):
    """System-wide admin settings"""
    # Password Policy
    password_min_length: int
    require_special_chars: bool
    
    # Session Management
    session_timeout_minutes: int
    max_login_attempts: int
    
    # Shoutout Configuration
    shoutout_daily_limit: int
    shoutout_weekly_limit: int
    
    # System Status
    email_system_enabled: bool
    
    model_config = ConfigDict(from_attributes=True)


class AdminSettingUpdateRequest(BaseModel):
    """Request body for PUT /admin/settings/{key}"""
    value: Any


class AdminSettingUpdateResponse(BaseModel):
    """Response for admin setting update endpoints"""
    success: bool
    updated_field: str
    new_value: Any
    message: str