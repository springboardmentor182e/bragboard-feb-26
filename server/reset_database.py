import sys
import os

# Change to server directory
os.chdir(os.path.dirname(__file__))
sys.path.insert(0, os.getcwd())

# Now import from src
from src.database.core import Base, engine
from src.entities.user import User
from src.entities.shoutout import Shoutout
from src.entities.comment import Comment
from src.entities.reaction import Reaction
from src.entities.shoutout_recipient import ShoutOutRecipient
from src.entities.report import Report

# Drop all tables with CASCADE
print("🔄 Dropping all tables...")
from sqlalchemy import text
with engine.connect() as connection:
    connection.execute(text("DROP SCHEMA public CASCADE"))
    connection.execute(text("CREATE SCHEMA public"))
    connection.commit()
print("✅ All tables dropped")

# Create all tables with CASCADE constraints
print("🔄 Creating all tables with CASCADE DELETE constraints...")
Base.metadata.create_all(bind=engine)
print("✅ All tables created successfully with CASCADE constraints")
