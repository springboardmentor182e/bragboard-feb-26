from typing import Any

def success_response(data: Any, message: str = "Success"):
    return {
        "success": True,
        "message": message,
        "data": data
    }

def error_response(message: str = "Something went wrong"):
    return {
        "success": False,
        "message": message,
        "data": None
    }