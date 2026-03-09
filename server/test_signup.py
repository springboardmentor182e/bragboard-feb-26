import requests
import json

url = "http://localhost:8000/api/v1/auth/signup"
data = {
    "email": "newuser999@gmail.com",
    "password": "password123",
    "role": "employee"
}

try:
    response = requests.post(url, json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
