from typing import List, Optional
from .models import (
    User, Badge, Shoutout, Notification, Activity,
    AnalyticsMetric, TopContributor, DepartmentEngagement,
    LeaderboardStat, TopPerformer, FullRanking, Campaign,
    Sender, Recipient, BadgeInfo, Reactions
)


# Mock Data - Team Members
team_members_db: List[User] = [
    User(id=1, name="Jessica Park", role="Engineering Lead", department="Engineering", 
         avatar="https://i.pravatar.cc/80?u=jessica-park", shout_outs=42, claps=89, stars=67, points=3256),
    User(id=2, name="David Kim", role="UX Designer", department="Design",
         avatar="https://i.pravatar.cc/80?u=david-kim-design", shout_outs=38, claps=76, stars=66, points=2634),
    User(id=3, name="Sarah Johnson", role="Product Manager", department="Design",
         avatar="https://i.pravatar.cc/80?u=sarah-johnson-pm", shout_outs=45, claps=92, stars=76, points=2847),
    User(id=4, name="Michael Chen", role="Senior Developer", department="Engineering",
         avatar="https://i.pravatar.cc/80?u=michael-chen-dev", shout_outs=35, claps=68, stars=60, points=2456),
    User(id=5, name="Emily Rodriguez", role="Marketing Lead", department="Marketing",
         avatar="https://i.pravatar.cc/80?u=emily-rodriguez", shout_outs=40, claps=82, stars=63, points=2198),
    User(id=6, name="Alex Thompson", role="Sales Manager", department="Sales",
         avatar="https://i.pravatar.cc/80?u=alex-thompson-admin", shout_outs=32, claps=65, stars=53, points=2045),
    User(id=7, name="James Wilson", role="Sales Representative", department="Sales",
         avatar="https://i.pravatar.cc/80?u=james-wilson-sales", shout_outs=28, claps=55, stars=42, points=1923),
    User(id=8, name="Lisa Anderson", role="HR Manager", department="HR",
         avatar="https://i.pravatar.cc/80?u=lisa-anderson-hr", shout_outs=25, claps=48, stars=38, points=1876),
    User(id=9, name="Robert Chang", role="Backend Developer", department="Engineering",
         avatar="https://i.pravatar.cc/80?u=robert-chang-eng", shout_outs=30, claps=58, stars=45, points=1745),
    User(id=10, name="Maria Garcia", role="UI Designer", department="Design",
         avatar="https://i.pravatar.cc/80?u=maria-garcia-design", shout_outs=26, claps=52, stars=40, points=1612),
]

# Mock Data - Badges
badges_db: List[Badge] = [
    Badge(id=1, emoji="⭐", name="Innovation Star", description="For groundbreaking ideas", awarded=24),
    Badge(id=2, emoji="🤝", name="Team Player", description="Exceptional collaboration", awarded=32),
    Badge(id=3, emoji="💡", name="Creative Genius", description="Outstanding creativity", awarded=18),
    Badge(id=4, emoji="👑", name="Leadership Excellence", description="Inspiring leadership", awarded=15),
    Badge(id=5, emoji="🎯", name="Problem Solver", description="Critical thinking master", awarded=28),
    Badge(id=6, emoji="✨", name="Culture Champion", description="Building great culture", awarded=21),
    Badge(id=7, emoji="🏆", name="Sales Champion", description="Sales excellence", awarded=19),
    Badge(id=8, emoji="💪", name="Customer Hero", description="Customer satisfaction", awarded=26),
]

# Mock Data - Shoutouts
shoutouts_db: List[Shoutout] = [
    Shoutout(
        id=1,
        sender=Sender(name="Michael Chen", role="Senior Developer", avatar="https://i.pravatar.cc/48?u=michael-chen-dev"),
        recipient=Recipient(name="Jessica Park"),
        badge=BadgeInfo(emoji="⭐", label="Innovation Star"),
        message="Jessica absolutely crushed it during our product launch! She worked late nights to fix critical bugs and mentored junior developers along the way. Her dedication and positive attitude made all the difference. Thank you! 🚀",
        time_ago="2 hours ago",
        reactions=Reactions(heart=38, thumbs_up=12, star=15, comment=5)
    ),
    Shoutout(
        id=2,
        sender=Sender(name="Sarah Johnson", role="Product Manager", avatar="https://i.pravatar.cc/48?u=sarah-johnson-pm"),
        recipient=Recipient(name="David Kim"),
        badge=BadgeInfo(emoji="🤝", label="Team Player"),
        message="David's attention to detail in the redesign project was phenomenal. Every pixel was perfect, and he truly understood our users' needs. Outstanding work!",
        time_ago="5 hours ago",
        reactions=Reactions(heart=24, thumbs_up=9, star=11, comment=3)
    ),
    Shoutout(
        id=3,
        sender=Sender(name="Jessica Park", role="Engineering Lead", avatar="https://i.pravatar.cc/48?u=jessica-park"),
        recipient=Recipient(name="Michael Chen"),
        badge=BadgeInfo(emoji="💡", label="Creative Genius"),
        message="Michael's solution to the caching problem was incredibly elegant. He not only fixed the issue but also documented it beautifully for the team.",
        time_ago="1 day ago",
        reactions=Reactions(heart=45, thumbs_up=18, star=22, comment=8)
    ),
    Shoutout(
        id=4,
        sender=Sender(name="Emily Rodriguez", role="Marketing Lead", avatar="https://i.pravatar.cc/48?u=emily-rodriguez"),
        recipient=Recipient(name="Sarah Johnson"),
        badge=BadgeInfo(emoji="👑", label="Leadership Excellence"),
        message="Sarah's guidance during the product launch was exceptional. She kept everyone calm and focused even under tight deadlines.",
        time_ago="2 days ago",
        reactions=Reactions(heart=32, thumbs_up=14, star=18, comment=6)
    ),
    Shoutout(
        id=5,
        sender=Sender(name="David Kim", role="UX Designer", avatar="https://i.pravatar.cc/48?u=david-kim-design"),
        recipient=Recipient(name="Emily Rodriguez"),
        badge=BadgeInfo(emoji="🎯", label="Problem Solver"),
        message="Emily's marketing campaign exceeded all expectations. Her data-driven approach resulted in a 40% increase in leads.",
        time_ago="3 days ago",
        reactions=Reactions(heart=28, thumbs_up=11, star=14, comment=4)
    ),
]

# Mock Data - Notifications
notifications_db: List[Notification] = [
    Notification(id=1, text="You received 3 new recognitions today.", read=False),
    Notification(id=2, text="Sarah Johnson earned 'Team Player' badge.", read=False),
    Notification(id=3, text="David gave a shoutout to Emma.", read=True),
    Notification(id=4, text="Your campaign 'Q1 Goals' is 80% complete.", read=False),
    Notification(id=5, text="New badge available: Culture Champion", read=True),
]

# Mock Data - Activities
activities_db: List[Activity] = [
    Activity(id=1, text="David gave a shoutout to Emma", time_ago="2h ago"),
    Activity(id=2, text="Sarah earned Innovation Star badge", time_ago="5h ago"),
    Activity(id=3, text="Michael completed Q1 campaign", time_ago="1d ago"),
    Activity(id=4, text="Jessica reached 3000 points", time_ago="1d ago"),
    Activity(id=5, text="Team Engineering exceeded goals", time_ago="2d ago"),
]

# Mock Data - Analytics Metrics
analytics_metrics_db: List[AnalyticsMetric] = [
    AnalyticsMetric(label="Total Shout-Outs", value="245", trend="+12%", icon_key="shoutouts", card_variant="purple"),
    AnalyticsMetric(label="Total Reactions", value="1,842", trend="+18%", icon_key="reactions", card_variant="pink"),
    AnalyticsMetric(label="Active Users", value="56", trend="+8%", icon_key="users", card_variant="green"),
]

# Mock Data - Top Contributors
top_contributors_db: List[TopContributor] = [
    TopContributor(name="Jessica", value=48),
    TopContributor(name="Sarah", value=40),
    TopContributor(name="David", value=34),
    TopContributor(name="Michael", value=32),
    TopContributor(name="Emily", value=31),
]

# Mock Data - Department Engagement
department_engagement_db: List[DepartmentEngagement] = [
    DepartmentEngagement(name="Engineering", value=35, color="#4F46E5"),
    DepartmentEngagement(name="Design", value=25, color="#8B5CF6"),
    DepartmentEngagement(name="Marketing", value=20, color="#F59E0B"),
    DepartmentEngagement(name="Sales", value=15, color="#10B981"),
    DepartmentEngagement(name="HR", value=5, color="#F43F5E"),
]

# Mock Data - Leaderboard Stats
leaderboard_stats_db: List[LeaderboardStat] = [
    LeaderboardStat(label="Top Score", value="3,256", sub="Jessica Park", variant="yellow"),
    LeaderboardStat(label="Total Badges", value="83", sub="Awarded this month", variant="gray"),
    LeaderboardStat(label="Growth", value="+24%", sub="vs last month", variant="green"),
]

# Mock Data - Top Performers
top_performers_db: List[TopPerformer] = [
    TopPerformer(rank=2, name="Sarah Johnson", score=2847, department="Design", badges=12),
    TopPerformer(rank=1, name="Jessica Park", score=3256, department="Engineering", badges=15),
    TopPerformer(rank=3, name="David Kim", score=2634, department="Design", badges=10),
]

# Mock Data - Full Rankings
full_rankings_db: List[FullRanking] = [
    FullRanking(rank=4, name="Michael Chen", department="Engineering", points=2456, badges=9, trend="up", avatar="https://i.pravatar.cc/40?u=michael-chen-dev"),
    FullRanking(rank=5, name="Emily Rodriguez", department="Marketing", points=2198, badges=8, trend="up", avatar="https://i.pravatar.cc/40?u=emily-rodriguez"),
    FullRanking(rank=6, name="Alex Thompson", department="Sales", points=2045, badges=7, trend="down", avatar="https://i.pravatar.cc/40?u=alex-thompson-admin"),
    FullRanking(rank=7, name="James Wilson", department="Sales", points=1923, badges=6, trend="up", avatar="https://i.pravatar.cc/40?u=james-wilson-sales"),
    FullRanking(rank=8, name="Lisa Anderson", department="HR", points=1876, badges=6, trend="up", avatar="https://i.pravatar.cc/40?u=lisa-anderson-hr"),
    FullRanking(rank=9, name="Robert Chang", department="Engineering", points=1745, badges=5, trend="down", avatar="https://i.pravatar.cc/40?u=robert-chang-eng"),
    FullRanking(rank=10, name="Maria Garcia", department="Design", points=1612, badges=5, trend="up", avatar="https://i.pravatar.cc/40?u=maria-garcia-design"),
]

# Mock Data - Campaigns
campaigns_db: List[Campaign] = [
    Campaign(
        id=1,
        title="Q1 Team Goals",
        description="Complete all Q1 objectives as a team",
        progress=80,
        participants=24,
        ends_in="5 days",
        icon="🎯"
    ),
    Campaign(
        id=2,
        title="Customer Excellence",
        description="Achieve 95% customer satisfaction",
        progress=65,
        participants=18,
        ends_in="12 days",
        icon="⭐"
    ),
    Campaign(
        id=3,
        title="Innovation Month",
        description="Submit innovative ideas for process improvement",
        progress=40,
        participants=32,
        ends_in="20 days",
        icon="💡"
    ),
]


# Service Functions
class DashboardService:
    
    # Team Members
    @staticmethod
    def get_all_users() -> List[User]:
        return team_members_db
    
    @staticmethod
    def get_user_by_id(user_id: int) -> Optional[User]:
        return next((u for u in team_members_db if u.id == user_id), None)
    
    @staticmethod
    def get_users_by_department(department: str) -> List[User]:
        if department == "All Departments":
            return team_members_db
        return [u for u in team_members_db if u.department == department]
    
    @staticmethod
    def search_users(query: str) -> List[User]:
        return [u for u in team_members_db if query.lower() in u.name.lower()]
    
    @staticmethod
    def update_user(user_id: int, user_update: dict) -> Optional[User]:
        for user in team_members_db:
            if user.id == user_id:
                for key, value in user_update.items():
                    if hasattr(user, key) and value is not None:
                        setattr(user, key, value)
                return user
        return None
    
    # Badges
    @staticmethod
    def get_all_badges() -> List[Badge]:
        return badges_db
    
    @staticmethod
    def get_badge_by_id(badge_id: int) -> Optional[Badge]:
        return next((b for b in badges_db if b.id == badge_id), None)
    
    # Shoutouts
    @staticmethod
    def get_all_shoutouts() -> List[Shoutout]:
        return shoutouts_db
    
    @staticmethod
    def get_shoutout_by_id(shoutout_id: int) -> Optional[Shoutout]:
        return next((s for s in shoutouts_db if s.id == shoutout_id), None)
    
    @staticmethod
    def create_shoutout(sender_id: int, recipient_id: int, badge_id: int, message: str) -> Shoutout:
        sender = DashboardService.get_user_by_id(sender_id)
        recipient = DashboardService.get_user_by_id(recipient_id)
        badge = DashboardService.get_badge_by_id(badge_id)
        
        if not sender or not recipient or not badge:
            raise ValueError("Invalid sender, recipient, or badge")
        
        new_id = len(shoutouts_db) + 1
        new_shoutout = Shoutout(
            id=new_id,
            sender=Sender(name=sender.name, role=sender.role, avatar=sender.avatar),
            recipient=Recipient(name=recipient.name),
            badge=BadgeInfo(emoji=badge.emoji, label=badge.name),
            message=message,
            time_ago="Just now",
            reactions=Reactions(heart=0, thumbs_up=0, star=0, comment=0)
        )
        shoutouts_db.append(new_shoutout)
        return new_shoutout
    
    @staticmethod
    def add_reaction(shoutout_id: int, reaction_type: str) -> Optional[Shoutout]:
        for shoutout in shoutouts_db:
            if shoutout.id == shoutout_id:
                if hasattr(shoutout.reactions, reaction_type):
                    current = getattr(shoutout.reactions, reaction_type)
                    setattr(shoutout.reactions, reaction_type, current + 1)
                return shoutout
        return None
    
    # Notifications
    @staticmethod
    def get_all_notifications() -> List[Notification]:
        return notifications_db
    
    @staticmethod
    def mark_notification_read(notification_id: int) -> Optional[Notification]:
        for notification in notifications_db:
            if notification.id == notification_id:
                notification.read = True
                return notification
        return None
    
    @staticmethod
    def mark_all_notifications_read() -> List[Notification]:
        for notification in notifications_db:
            notification.read = True
        return notifications_db
    
    # Activities
    @staticmethod
    def get_all_activities() -> List[Activity]:
        return activities_db
    
    # Analytics
    @staticmethod
    def get_analytics_metrics() -> List[AnalyticsMetric]:
        return analytics_metrics_db
    
    @staticmethod
    def get_top_contributors() -> List[TopContributor]:
        return top_contributors_db
    
    @staticmethod
    def get_department_engagement() -> List[DepartmentEngagement]:
        return department_engagement_db
    
    # Leaderboard
    @staticmethod
    def get_leaderboard_stats() -> List[LeaderboardStat]:
        return leaderboard_stats_db
    
    @staticmethod
    def get_top_performers() -> List[TopPerformer]:
        return top_performers_db
    
    @staticmethod
    def get_full_rankings() -> List[FullRanking]:
        return full_rankings_db
    
    @staticmethod
    def get_user_rank(user_id: int) -> Optional[FullRanking]:
        all_rankings = sorted([*top_performers_db, *full_rankings_db], key=lambda x: x.score, reverse=True)
        for i, rank in enumerate(all_rankings, 1):
            if rank.name == team_members_db[user_id - 1].name if user_id <= len(team_members_db) else False:
                return FullRanking(
                    rank=i,
                    name=rank.name,
                    department=rank.department,
                    points=rank.score,
                    badges=rank.badges,
                    trend="up",
                    avatar=team_members_db[user_id - 1].avatar
                )
        return None
    
    # Campaigns
    @staticmethod
    def get_all_campaigns() -> List[Campaign]:
        return campaigns_db
    
    @staticmethod
    def get_campaign_by_id(campaign_id: int) -> Optional[Campaign]:
        return next((c for c in campaigns_db if c.id == campaign_id), None)


# Singleton instance
dashboard_service = DashboardService()

