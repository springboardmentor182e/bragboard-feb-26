from src.database.core import engine
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text("DROP TABLE IF EXISTS shoutout_recipients CASCADE;"))
    conn.commit()
    print("✅ Dropped shoutout_recipients table")

from src.database.core import Base
Base.metadata.create_all(bind=engine)
print("✅ Recreated tables from models")

# Verify
from sqlalchemy import inspect
inspector = inspect(engine)
if 'shoutout_recipients' in inspector.get_table_names():
    cols = inspector.get_columns('shoutout_recipients')
    print(f"\n✅ shoutout_recipients columns: {[c['name'] for c in cols]}")
