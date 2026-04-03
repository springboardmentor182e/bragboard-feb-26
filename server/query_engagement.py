import sys
sys.path.insert(0, '.')
from src.database.core import SessionLocal
from sqlalchemy import text

session = SessionLocal()
try:
    print('=== Total Engagement for APPROVED Shout-outs ===')
    result = session.execute(text("""
        SELECT COUNT(DISTINCT s.id) as shoutouts, COUNT(r.id) as reactions, COUNT(c.id) as comments 
        FROM shoutouts s 
        LEFT JOIN reactions r ON s.id = r.shoutout_id 
        LEFT JOIN comments c ON s.id = c.shoutout_id 
        WHERE s.status='APPROVED'
    """))
    row = result.fetchone()
    print(f'Shoutouts: {row[0]}')
    print(f'Reactions: {row[1]}')
    print(f'Comments: {row[2]}')
    print(f'Total Engagement: {row[1] + row[2]}')
        
except Exception as e:
    print(f'Error: {e}')
    import traceback
    traceback.print_exc()
finally:
    session.close()
