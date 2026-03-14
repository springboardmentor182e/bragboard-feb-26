from jose import jwt
from datetime import datetime,timedelta

SECRET_KEY="mysecretkey"
ALGORITHM="HS256"

def create_access_token(data:dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=30)

    to_encode.update({"exp":expire})

    token = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)

    return token