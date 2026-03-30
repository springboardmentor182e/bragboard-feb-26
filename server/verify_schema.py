from src.database.core import SessionLocal
from sqlalchemy import inspect

db = SessionLocal()
inspector = inspect(db.get_bind())
tables = inspector.get_table_names()

print('📊 Database Tables Created:')
for table in sorted(tables):
    print(f'  ✅ {table}')
    
print('\n📋 Shoutout Recipients Columns:')
if 'shoutout_recipients' in tables:
    columns = inspector.get_columns('shoutout_recipients')
    for col in columns:
        print(f'  ✅ {col["name"]} ({col["type"]})')
else:
    print('  ❌ shoutout_recipients table NOT FOUND')
    
db.close()
