import sys
sys.path.insert(0, '.')
from src.database.core import engine, SessionLocal
from sqlalchemy import text
from datetime import datetime

session = SessionLocal()
try:
    print('=== Recent Shoutouts ===')
    result = session.execute(text('''
        SELECT s.id, s.status, s.category, u1.email as sender, u2.email as receiver, 
               s.points, s.created_at 
        FROM shoutouts s 
        LEFT JOIN users u1 ON s.sender_id = u1.id 
        LEFT JOIN users u2 ON s.receiver_id = u2.id
        ORDER BY s.created_at DESC 
        LIMIT 10
    '''))
    print('ID | Status | Category | Points | Created At')
    print('----|--------|----------|--------|----------------------')
    for row in result:
        created = row[6].strftime('%Y-%m-%d %H:%M:%S') if row[6] else 'N/A'
        print(f'{row[0]} | {row[1]} | {row[2]} | {row[5]} | {created}')
        
except Exception as e:
    print(f'Error: {e}')
    import traceback
    traceback.print_exc()
finally:
    session.close()
