import sys
sys.path.insert(0, '.')
from src.database.core import engine, SessionLocal
from sqlalchemy import text

session = SessionLocal()
try:
    # Get detailed information about shoutouts
    print('=== Total Shoutouts Count ===')
    result = session.execute(text('SELECT COUNT(*) FROM shoutouts'))
    total = result.scalar()
    print(f'Total shoutouts: {total}')
    
    print('\n=== Status Distribution ===')
    result = session.execute(text('SELECT status, COUNT(*) FROM shoutouts GROUP BY status'))
    for row in result:
        status = row[0] if row[0] else 'None'
        print(f'{status}: {row[1]}')
    
    print('\n=== Status and Category Distribution ===')
    result = session.execute(text('SELECT status, category, COUNT(*) FROM shoutouts GROUP BY status, category ORDER BY status, category'))
    print('Status | Category | Count')
    print('-------|----------|-------')
    for row in result:
        status = row[0] if row[0] else 'None'
        category = row[1] if row[1] else 'None'
        print(f'{status} | {category} | {row[2]}')
        
except Exception as e:
    print(f'Error: {e}')
    import traceback
    traceback.print_exc()
finally:
    session.close()
