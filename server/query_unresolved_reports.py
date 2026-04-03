import sys
sys.path.insert(0, '.')
from src.database.core import SessionLocal
from sqlalchemy import text
import pandas as pd

session = SessionLocal()
try:
    print('=== Unresolved Reports and Linked Shout-outs ===')
    result = session.execute(text("""
        SELECT r.id as report_id, r.status as report_status, r.shoutout_id, s.id, s.message 
        FROM reports r 
        LEFT JOIN shoutouts s ON r.shoutout_id = s.id 
        WHERE r.status != 'RESOLVED' 
        ORDER BY r.id;
    """))
    
    rows = result.fetchall()
    
    if rows:
        print(f'\nFound {len(rows)} unresolved report(s):\n')
        for row in rows:
            print(f'Report ID: {row[0]}')
            print(f'  Status: {row[1]}')
            print(f'  Shoutout ID: {row[2]}')
            print(f'  Shoutout Master ID: {row[3]}')
            print(f'  Message: {row[4]}')
            print()
    else:
        print('No unresolved reports found.')
        
except Exception as e:
    print(f'Error: {e}')
    import traceback
    traceback.print_exc()
finally:
    session.close()
