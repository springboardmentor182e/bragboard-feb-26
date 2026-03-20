from sqlalchemy import Column, Integer, String
<<<<<<< HEAD
from database.db import Base
=======
from src.database.core import Base
>>>>>>> b965fc4a7c5ebee34091241f01986483a1400b8f

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
<<<<<<< HEAD
    email = Column(String, unique=True)
    password = Column(String)
=======
    name = Column(String)
    department = Column(String)
    points = Column(Integer)
    badges = Column(Integer)
    trend = Column(String)
>>>>>>> b965fc4a7c5ebee34091241f01986483a1400b8f
