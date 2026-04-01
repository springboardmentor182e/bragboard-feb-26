import sys
sys.path.insert(0, 'server')

from src.admin.service import AdminService
from src.database.core import SessionLocal

db = SessionLocal()
service = AdminService(db)
analytics = service.get_engagement_analytics()

print("✅ Engagement Analytics Data:")
print(f"  Contributors: {len(analytics.get('top_contributors', []))}")
print(f"  Departments: {len(analytics.get('department_engagement', []))}")
print(f"  Categories: {len(analytics.get('category_breakdown', []))}")
print(f"  Reactions: {analytics.get('reaction_breakdown', {})}")

if analytics['top_contributors']:
    for i, c in enumerate(analytics['top_contributors'][:3]):
        print(f"\n{i+1}. {c.get('name')} (Dept: {c.get('department')})")
        print(f"   Score: {c.get('engagement_score'):.1f}")
        print(f"   Sent: {c.get('sent')}, Received: {c.get('received')}, Reactions: {c.get('reactions')}")

if analytics['department_engagement']:
    print("\nDepartment Engagement:")
    for d in analytics['department_engagement'][:3]:
        print(f"  {d['department']}: {d['percentage']}% ({d['shoutouts']} shouts, {d['members']} members)")
