import sys
sys.path.insert(0, '.')
from src.database.core import engine, SessionLocal
from sqlalchemy import text

session = SessionLocal()
try:
    print('=== Updating PENDING to APPROVED ===')
    result = session.execute(text("""
        UPDATE shoutouts SET status='APPROVED' WHERE status='PENDING'
    """))
    session.commit()
    print(f'Updated {result.rowcount} shoutout(s)')
    
    print('\n=== Verifying Status Distribution ===')
    result = session.execute(text("""
        SELECT status, COUNT(*) as count FROM shoutouts GROUP BY status ORDER BY status
    """))
    print('Status | Count')
    print('--------|-------')
    for row in result:
        print(f'{row[0]} | {row[1]}')
        
except Exception as e:
    print(f'Error: {e}')
    import traceback
    traceback.print_exc()
finally:
    session.close()
