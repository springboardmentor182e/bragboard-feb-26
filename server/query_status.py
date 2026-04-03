import sys
sys.path.insert(0, '.')
from src.database.core import engine, SessionLocal
from sqlalchemy import text

# Get the database URL
print(f'Database URL: {engine.url}')

# Create session and run query
session = SessionLocal()
try:
    # Direct SQL query
    result = session.execute(text('SELECT status, COUNT(*) as count FROM shoutouts GROUP BY status'))
    print('\nShoutout Status Summary:')
    print('Status | Count')
    print('-------|-------')
    for row in result:
        status = row[0] if row[0] else 'None'
        print(f'{status} | {row[1]}')
except Exception as e:
    print(f'Error: {e}')
    import traceback
    traceback.print_exc()
finally:
    session.close()
