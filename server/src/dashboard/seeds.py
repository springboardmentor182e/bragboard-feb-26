"""
Seed script to populate the database with initial data.
Run with: python -m src.dashboard.seeds
"""

from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from src.database.core import SessionLocal, engine, init_db
from src.dashboard.database_models import (
    Base, UserDB, BadgeDB, ShoutoutDB, NotificationDB, ActivityDB, CampaignDB
)


def seed_users(db: Session):
    """Seed users table with mock data"""
    users = [
        UserDB(id=1, name="Jessica Park", role="Engineering Lead", department="Engineering", 
               avatar="https://i.pravatar.cc/80?u=jessica-park", shout_outs=42, claps=89, stars=67, points=3256),
        UserDB(id=2, name="David Kim", role="UX Designer", department="Design",
               avatar="https://i.pravatar.cc/80?u=david-kim-design", shout_outs=38, claps=76, stars=66, points=2634),
        UserDB(id=3, name="Sarah Johnson", role="Product Manager", department="Design",
               avatar="https://i.pravatar.cc/80?u=sarah-johnson-pm", shout_outs=45, claps=92, stars=76, points=2847),
        UserDB(id=4, name="Michael Chen", role="Senior Developer", department="Engineering",
               avatar="https://i.pravatar.cc/80?u=michael-chen-dev", shout_outs=35, claps=68, stars=60, points=2456),
        UserDB(id=5, name="Emily Rodriguez", role="Marketing Lead", department="Marketing",
               avatar="https://i.pravatar.cc/80?u=emily-rodriguez", shout_outs=40, claps=82, stars=63, points=2198),
        UserDB(id=6, name="Alex Thompson", role="Sales Manager", department="Sales",
               avatar="https://i.pravatar.cc/80?u=alex-thompson-admin", shout_outs=32, claps=65, stars=53, points=2045),
        UserDB(id=7, name="James Wilson", role="Sales Representative", department="Sales",
               avatar="https://i.pravatar.cc/80?u=james-wilson-sales", shout_outs=28, claps=55, stars=42, points=1923),
        UserDB(id=8, name="Lisa Anderson", role="HR Manager", department="HR",
               avatar="https://i.pravatar.cc/80?u=lisa-anderson-hr", shout_outs=25, claps=48, stars=38, points=1876),
        UserDB(id=9, name="Robert Chang", role="Backend Developer", department="Engineering",
               avatar="https://i.pravatar.cc/80?u=robert-chang-eng", shout_outs=30, claps=58, stars=45, points=1745),
        UserDB(id=10, name="Maria Garcia", role="UI Designer", department="Design",
               avatar="https://i.pravatar.cc/80?u=maria-garcia-design", shout_outs=26, claps=52, stars=40, points=1612),
    ]
    db.add_all(users)
    db.commit()
    print("✓ Seeded 10 users")


def seed_badges(db: Session):
    """Seed badges table with mock data"""
    badges = [
        BadgeDB(id=1, emoji="⭐", name="Innovation Star", description="For groundbreaking ideas", awarded=24),
        BadgeDB(id=2, emoji="🤝", name="Team Player", description="Exceptional collaboration", awarded=32),
        BadgeDB(id=3, emoji="💡", name="Creative Genius", description="Outstanding creativity", awarded=18),
        BadgeDB(id=4, emoji="👑", name="Leadership Excellence", description="Inspiring leadership", awarded=15),
        BadgeDB(id=5, emoji="🎯", name="Problem Solver", description="Critical thinking master", awarded=28),
        BadgeDB(id=6, emoji="✨", name="Culture Champion", description="Building great culture", awarded=21),
        BadgeDB(id=7, emoji="🏆", name="Sales Champion", description="Sales excellence", awarded=19),
        BadgeDB(id=8, emoji="💪", name="Customer Hero", description="Customer satisfaction", awarded=26),
    ]
    db.add_all(badges)
    db.commit()
    print("✓ Seeded 8 badges")


def seed_shoutouts(db: Session):
    """Seed shoutouts table with mock data"""
    now = datetime.utcnow()
    shoutouts = [
        ShoutoutDB(
            id=1,
            sender_id=4,  # Michael Chen
            recipient_id=1,  # Jessica Park
            badge_id=1,  # Innovation Star
            message="Jessica absolutely crushed it during our product launch! She worked late nights to fix critical bugs and mentored junior developers along the way. Her dedication and positive attitude made all the difference. Thank you! 🚀",
            created_at=now - timedelta(hours=2),
            heart_reactions=38,
            thumbs_up_reactions=12,
            star_reactions=15,
            comment_reactions=5
        ),
        ShoutoutDB(
            id=2,
            sender_id=3,  # Sarah Johnson
            recipient_id=2,  # David Kim
            badge_id=2,  # Team Player
            message="David's attention to detail in the redesign project was phenomenal. Every pixel was perfect, and he truly understood our users' needs. Outstanding work!",
            created_at=now - timedelta(hours=5),
            heart_reactions=24,
            thumbs_up_reactions=9,
            star_reactions=11,
            comment_reactions=3
        ),
        ShoutoutDB(
            id=3,
            sender_id=1,  # Jessica Park
            recipient_id=4,  # Michael Chen
            badge_id=3,  # Creative Genius
            message="Michael's solution to the caching problem was incredibly elegant. He not only fixed the issue but also documented it beautifully for the team.",
            created_at=now - timedelta(days=1),
            heart_reactions=45,
            thumbs_up_reactions=18,
            star_reactions=22,
            comment_reactions=8
        ),
        ShoutoutDB(
            id=4,
            sender_id=5,  # Emily Rodriguez
            recipient_id=3,  # Sarah Johnson
            badge_id=4,  # Leadership Excellence
            message="Sarah's guidance during the product launch was exceptional. She kept everyone calm and focused even under tight deadlines.",
            created_at=now - timedelta(days=2),
            heart_reactions=32,
            thumbs_up_reactions=14,
            star_reactions=18,
            comment_reactions=6
        ),
        ShoutoutDB(
            id=5,
            sender_id=2,  # David Kim
            recipient_id=5,  # Emily Rodriguez
            badge_id=5,  # Problem Solver
            message="Emily's marketing campaign exceeded all expectations. Her data-driven approach resulted in a 40% increase in leads.",
            created_at=now - timedelta(days=3),
            heart_reactions=28,
            thumbs_up_reactions=11,
            star_reactions=14,
            comment_reactions=4
        ),
    ]
    db.add_all(shoutouts)
    db.commit()
    print("✓ Seeded 5 shoutouts")


def seed_notifications(db: Session):
    """Seed notifications table with mock data"""
    now = datetime.utcnow()
    notifications = [
        NotificationDB(user_id=1, text="You received 3 new recognitions today.", read=False, created_at=now),
        NotificationDB(user_id=1, text="Sarah Johnson earned 'Team Player' badge.", read=False, created_at=now - timedelta(hours=1)),
        NotificationDB(user_id=2, text="David gave a shoutout to Emma.", read=True, created_at=now - timedelta(hours=2)),
        NotificationDB(user_id=1, text="Your campaign 'Q1 Goals' is 80% complete.", read=False, created_at=now - timedelta(hours=3)),
        NotificationDB(user_id=1, text="New badge available: Culture Champion", read=True, created_at=now - timedelta(hours=4)),
    ]
    db.add_all(notifications)
    db.commit()
    print("✓ Seeded 5 notifications")


def seed_activities(db: Session):
    """Seed activities table with mock data"""
    now = datetime.utcnow()
    activities = [
        ActivityDB(user_id=2, text="David gave a shoutout to Emma", created_at=now - timedelta(hours=2)),
        ActivityDB(user_id=3, text="Sarah earned Innovation Star badge", created_at=now - timedelta(hours=5)),
        ActivityDB(user_id=4, text="Michael completed Q1 campaign", created_at=now - timedelta(days=1)),
        ActivityDB(user_id=1, text="Jessica reached 3000 points", created_at=now - timedelta(days=1)),
        ActivityDB(user_id=1, text="Team Engineering exceeded goals", created_at=now - timedelta(days=2)),
    ]
    db.add_all(activities)
    db.commit()
    print("✓ Seeded 5 activities")


def seed_campaigns(db: Session):
    """Seed campaigns table with mock data"""
    now = datetime.utcnow()
    campaigns = [
        CampaignDB(
            id=1,
            title="Q1 Team Goals",
            description="Complete all Q1 objectives as a team",
            progress=80,
            participants=24,
            ends_in_days=5,
            icon="🎯",
            created_at=now,
            updated_at=now
        ),
        CampaignDB(
            id=2,
            title="Customer Excellence",
            description="Achieve 95% customer satisfaction",
            progress=65,
            participants=18,
            ends_in_days=12,
            icon="⭐",
            created_at=now - timedelta(days=5),
            updated_at=now
        ),
        CampaignDB(
            id=3,
            title="Innovation Month",
            description="Submit innovative ideas for process improvement",
            progress=40,
            participants=32,
            ends_in_days=20,
            icon="💡",
            created_at=now - timedelta(days=10),
            updated_at=now
        ),
    ]
    db.add_all(campaigns)
    db.commit()
    print("✓ Seeded 3 campaigns")


def main():
    """Run all seed functions"""
    print("\n🌱 Starting database seed...")
    
    # Initialize database (create tables)
    init_db()
    print("✓ Database initialized")
    
    # Get session
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(UserDB).first():
            print("⚠ Database already contains data. Skipping seed.")
            return
        
        # Seed all data
        seed_users(db)
        seed_badges(db)
        seed_shoutouts(db)
        seed_notifications(db)
        seed_activities(db)
        seed_campaigns(db)
        
        print("\n✅ Database seeding completed successfully!")
        
    finally:
        db.close()


if __name__ == "__main__":
    main()
