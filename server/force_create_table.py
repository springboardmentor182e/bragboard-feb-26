from src.database.core import Base, engine
from src.entities import user, shoutout, shoutout_recipient, report, reaction, comment

# Make sure all models are loaded
print("✅ Models loaded")

# Explicitly create the ShoutOutRecipient table
from src.entities.shoutout_recipient import ShoutOutRecipient
ShoutOutRecipient.__table__.create(engine, checkfirst=True)
print("✅ Created ShoutOutRecipient table")

# Verify
from sqlalchemy import inspect
inspector = inspect(engine)
if 'shoutout_recipients' in inspector.get_table_names():
    cols = inspector.get_columns('shoutout_recipients')
    col_names = [c['name'] for c in cols]
    print(f"✅ Table exists with columns: {col_names}")
    
    if 'user_id' in col_names:
        print("✅ SUCCESS - user_id column is present!")
    else:
        print("❌ ERROR - user_id column missing")
else:
    print("❌ ERROR - Table still doesn't exist")
