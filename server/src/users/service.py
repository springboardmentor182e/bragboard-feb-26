from typing import List
from .models import User

users_db: List[User] = [
    User(id=1, name="Sarah Chen", email="sarah@company.com", department="Product", role="Admin", status="Active"),
    User(id=2, name="David Kim", email="david@company.com", department="Engineering", role="Manager", status="Active"),
    User(id=3, name="Jessica Park", email="jessica@company.com", department="Design", role="Employee", status="Suspended"),
]

def get_users():
    return users_db

def add_user(user: User):
    users_db.append(user)
    return user

def update_user_status(user_id: int):
    for user in users_db:
        if user.id == user_id:
            user.status = "Suspended" if user.status == "Active" else "Active"
            return user
    return None