import sys
from src.database.core import Base, engine
from sqlalchemy import inspect

# Drop all tables
Base.metadata.drop_all(bind=engine)
print('✅ Dropped all tables')

# Import all models to ensure they're registered
from src.entities import user, shoutout, shoutout_recipient, report, reaction, comment

# Recreate all tables with current schema
Base.metadata.create_all(bind=engine)
print('✅ Recreated all tables')

# Verify the schema
inspector = inspect(engine)
print('\n📋 Database Tables:')
for table_name in sorted(inspector.get_table_names()):
    cols = inspector.get_columns(table_name)
    col_names = [c['name'] for c in cols]
    print(f'  {table_name}: {", ".join(col_names)}')

# Specifically check shoutout_recipients
if 'shoutout_recipients' in inspector.get_table_names():
    cols = inspector.get_columns('shoutout_recipients')
    has_user_id = any(c['name'] == 'user_id' for c in cols)
    has_recipient_id = any(c['name'] == 'recipient_id' for c in cols)
    
    print('\n✅ shoutout_recipients table:')
    print(f'   Has user_id: {has_user_id}')
    print(f'   Has recipient_id: {has_recipient_id}')
    
    if has_user_id:
        print('   ✅ CORRECT - user_id column exists!')
    else:
        print('   ❌ ERROR - user_id column missing!')
