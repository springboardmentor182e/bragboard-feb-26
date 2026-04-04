from sqlalchemy.orm import Session
from ..entities.user import User
from ..auth.utils import hash_password
from pydantic import BaseModel, ConfigDict
from typing import List, Any


class UserPublicResponse(BaseModel):
    id: int
    name: str
    email: str
    department: str | None = None
    role: str | None = None
    status: str | None = None
    model_config = ConfigDict(from_attributes=True)


def get_users(db: Session) -> List[dict]:
    users = db.query(User).all()
    # Convert to dict with only safe fields
    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "department": user.department,
            "role": user.role,
            "status": user.status,
        }
        for user in users
    ]


def add_user(db: Session, user_data):
    default_password = hash_password("123456")

    user = User(
        name=user_data.name,
        email=user_data.email,
        department=user_data.department,
        role=user_data.role,
        status=user_data.status,
        password=default_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    # Return safe fields only
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "department": user.department,
        "role": user.role,
        "status": user.status,
    }


def update_user_status(db: Session, user_id: int):
    """
    Smart status transitions:
    Pending → Active (approve new user)
    Active → Suspended (suspend user)
    Suspended → Active (reactivate user)
    """
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return None

    # Handle different status transitions
    if user.status == "Pending":
        user.status = "Active"      # Approve pending user
    elif user.status == "Active":
        user.status = "Suspended"   # Suspend active user
    elif user.status == "Suspended":
        user.status = "Active"      # Reactivate suspended user

    db.commit()
    db.refresh(user)

    # Return safe fields only
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "department": user.department,
        "role": user.role,
        "status": user.status,
    }


def update_user_role(db: Session, user_id: int, role: str):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return None

    user.role = role

    db.commit()
    db.refresh(user)

    # Return safe fields only
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "department": user.department,
        "role": user.role,
        "status": user.status,
    }


def update_user_department(db: Session, user_id: int, department: str):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return None

    user.department = department

    db.commit()
    db.refresh(user)

    # Return safe fields only
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "department": user.department,
        "role": user.role,
        "status": user.status,
    }


def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return False

    db.delete(user)
    db.commit()

    return True


# ========== SETTINGS FUNCTIONS ==========

def get_user_settings(db: Session, user_id: int) -> dict:
    """
    Fetch all user preference settings
    """
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        return None
    
    return {
        # Notifications
        "email_notifications": user.email_notifications,
        "push_notifications": user.push_notifications,
        "shoutout_alerts": user.shoutout_alerts,
        "comment_alerts": user.comment_alerts,
        "mention_alerts": user.mention_alerts,
        # Appearance
        "theme": user.theme,
        "compact_mode": user.compact_mode,
        "font_size": user.font_size,
        # Region & Language
        "language": user.language,
        "timezone": user.timezone,
        "date_format": user.date_format,
        "time_format": user.time_format,
        "week_start": user.week_start,
        "currency": user.currency,
        # Security
        "two_factor_enabled": user.two_factor_enabled,
        "session_timeout": user.session_timeout,
        "login_alerts_enabled": user.login_alerts_enabled,
    }


def validate_setting(key: str, value: Any) -> tuple[bool, str]:
    """
    Validate setting key and value
    Returns: (is_valid, error_message)
    """
    # Define valid settings and their constraints
    valid_settings = {
        # Notifications (boolean)
        "email_notifications": (bool, None),
        "push_notifications": (bool, None),
        "shoutout_alerts": (bool, None),
        "comment_alerts": (bool, None),
        "mention_alerts": (bool, None),
        # Appearance
        "theme": (str, ["light", "dark", "system"]),
        "compact_mode": (bool, None),
        "font_size": (str, ["small", "medium", "large"]),
        # Region & Language
        "language": (str, None),
        "timezone": (str, None),
        "date_format": (str, None),
        "time_format": (str, None),
        "week_start": (str, None),
        "currency": (str, None),
        # Security
        "two_factor_enabled": (bool, None),
        "session_timeout": (int, range(15, 121)),  # 15-120 minutes
        "login_alerts_enabled": (bool, None),
    }
    
    if key not in valid_settings:
        return False, f"Unknown setting: {key}"
    
    expected_type, allowed_values = valid_settings[key]
    
    # Type validation
    if not isinstance(value, expected_type):
        return False, f"Invalid type for {key}. Expected {expected_type.__name__}, got {type(value).__name__}"
    
    # Value validation (whitelist)
    if allowed_values is not None:
        if isinstance(allowed_values, range):
            if value not in allowed_values:
                return False, f"{key} must be between 15 and 120 minutes"
        elif isinstance(allowed_values, list):
            if value not in allowed_values:
                return False, f"Invalid value for {key}. Must be one of: {', '.join(map(str, allowed_values))}"
    
    return True, ""


def update_single_setting(db: Session, user_id: int, setting_key: str, value: Any) -> tuple[bool, dict]:
    """
    Auto-save a single user setting
    Returns: (success, response_dict)
    """
    # Validate the setting
    is_valid, error_msg = validate_setting(setting_key, value)
    if not is_valid:
        return False, {
            "success": False,
            "updated_field": setting_key,
            "new_value": None,
            "message": error_msg
        }
    
    # Get user
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return False, {
            "success": False,
            "updated_field": setting_key,
            "new_value": None,
            "message": "User not found"
        }
    
    # Update setting
    try:
        setattr(user, setting_key, value)
        db.commit()
        db.refresh(user)
        
        return True, {
            "success": True,
            "updated_field": setting_key,
            "new_value": value,
            "message": "Setting updated successfully"
        }
    except Exception as e:
        db.rollback()
        return False, {
            "success": False,
            "updated_field": setting_key,
            "new_value": None,
            "message": f"Failed to update setting: {str(e)}"
        }


def change_user_password(db: Session, user_id: int, old_password: str, new_password: str) -> tuple[bool, str]:
    """
    Change user password with validation
    Returns: (success, message)
    """
    from ..auth.utils import verify_password
    from datetime import datetime
    
    # Get user
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return False, "User not found"
    
    # Verify old password
    if not verify_password(old_password, user.password):
        return False, "Current password is incorrect"
    
    # Validate new password
    if len(new_password) < 8:
        return False, "New password must be at least 8 characters long"
    
    if new_password == old_password:
        return False, "New password must be different from current password"
    
    # Update password
    try:
        user.password = hash_password(new_password)
        user.password_changed_at = datetime.utcnow()
        db.commit()
        db.refresh(user)
        return True, "Password changed successfully"
    except Exception as e:
        db.rollback()
        return False, f"Failed to change password: {str(e)}"