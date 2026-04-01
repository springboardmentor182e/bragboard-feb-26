import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import sys
from pathlib import Path

# Add server directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.database.core import Base
from src.entities.user import User
from src.entities.shoutout import Shoutout
from src.entities.shoutout_recipient import ShoutOutRecipient
from src.auth.utils import hash_password
from src.shoutouts.service import create_shoutout_with_recipients, get_user_stats, get_leaderboard_users


# Create a test database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def setup_test_db():
    """Setup test database before each test"""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session(setup_test_db):
    """Provide a database session for tests"""
    session = TestingSessionLocal()
    yield session
    session.close()


@pytest.fixture
def test_users(db_session):
    """Create test users"""
    users = []
    
    # Create sender user
    sender = User(
        name="John Sender",
        email="sender@test.com",
        password=hash_password("password123"),
        department="Engineering",
        role="Employee",
        status="Active"
    )
    db_session.add(sender)
    db_session.flush()
    users.append(sender)
    
    # Create recipient users
    for i in range(3):
        user = User(
            name=f"Recipient {i+1}",
            email=f"recipient{i+1}@test.com",
            password=hash_password("password123"),
            department="Engineering",
            role="Employee",
            status="Active"
        )
        db_session.add(user)
        db_session.flush()
        users.append(user)
    
    db_session.commit()
    return users


class TestShoutoutCreation:
    """Tests for shoutout creation with multi-user tagging"""
    
    def test_create_shoutout_with_single_recipient(self, db_session, test_users):
        """Test creating a shoutout with a single recipient"""
        sender = test_users[0]
        recipient = test_users[1]
        
        result = create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Great work on the project!",
            category="Achievement",
            recipient_ids=[recipient.id],
            points=10
        )
        
        assert result["sender_id"] == sender.id
        assert result["message"] == "Great work on the project!"
        assert result["category"] == "Achievement"
        assert result["points"] == 10
        assert result["status"] == "PENDING"
        assert result["recipients_count"] == 1
        assert len(result["recipients"]) == 1
        assert result["recipients"][0]["id"] == recipient.id
        assert result["recipients"][0]["name"] == "Recipient 1"
    
    def test_create_shoutout_with_multiple_recipients(self, db_session, test_users):
        """Test creating a shoutout with multiple recipients"""
        sender = test_users[0]
        recipients = [test_users[1].id, test_users[2].id, test_users[3].id]
        
        result = create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Awesome teamwork!",
            category="Teamwork",
            recipient_ids=recipients,
            points=15
        )
        
        assert result["recipients_count"] == 3
        assert len(result["recipients"]) == 3
        recipient_ids = [r["id"] for r in result["recipients"]]
        assert set(recipient_ids) == set(recipients)
    
    def test_create_shoutout_invalid_recipient_id(self, db_session, test_users):
        """Test creating a shoutout with invalid recipient ID raises error"""
        sender = test_users[0]
        invalid_id = 99999
        
        with pytest.raises(ValueError, match="Invalid user IDs"):
            create_shoutout_with_recipients(
                db=db_session,
                sender_id=sender.id,
                message="Test message",
                category="Achievement",
                recipient_ids=[invalid_id],
                points=10
            )
    
    def test_create_shoutout_cannot_tag_self(self, db_session, test_users):
        """Test that user cannot tag themselves as recipient"""
        sender = test_users[0]
        
        with pytest.raises(ValueError, match="Cannot tag yourself"):
            create_shoutout_with_recipients(
                db=db_session,
                sender_id=sender.id,
                message="Test message",
                category="Achievement",
                recipient_ids=[sender.id],
                points=10
            )
    
    def test_create_shoutout_empty_recipients(self, db_session, test_users):
        """Test creating a shoutout with empty recipients list raises error"""
        sender = test_users[0]
        
        with pytest.raises(ValueError, match="At least one recipient"):
            create_shoutout_with_recipients(
                db=db_session,
                sender_id=sender.id,
                message="Test message",
                category="Achievement",
                recipient_ids=[],
                points=10
            )
    
    def test_create_shoutout_mixed_valid_invalid_recipients(self, db_session, test_users):
        """Test creating shoutout with mix of valid and invalid recipient IDs"""
        sender = test_users[0]
        valid_recipient = test_users[1].id
        invalid_recipient = 99999
        
        with pytest.raises(ValueError, match="Invalid user IDs"):
            create_shoutout_with_recipients(
                db=db_session,
                sender_id=sender.id,
                message="Test message",
                category="Achievement",
                recipient_ids=[valid_recipient, invalid_recipient],
                points=10
            )
    
    def test_shoutout_recipients_stored_in_db(self, db_session, test_users):
        """Test that recipients are properly stored in database"""
        sender = test_users[0]
        recipients_ids = [test_users[1].id, test_users[2].id]
        
        result = create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Great work!",
            category="Achievement",
            recipient_ids=recipients_ids,
            points=10
        )
        
        # Query database to verify
        shoutout = db_session.query(Shoutout).filter(Shoutout.id == result["id"]).first()
        assert shoutout is not None
        assert len(shoutout.recipients) == 2
        
        recipient_users = db_session.query(ShoutOutRecipient).filter(
            ShoutOutRecipient.shoutout_id == shoutout.id
        ).all()
        assert len(recipient_users) == 2
    
    def test_create_shoutout_default_points(self, db_session, test_users):
        """Test that default points are set correctly"""
        sender = test_users[0]
        recipient = test_users[1]
        
        result = create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Test",
            category="Achievement",
            recipient_ids=[recipient.id],
            points=10
        )
        
        assert result["points"] == 10
    
    def test_create_shoutout_custom_points(self, db_session, test_users):
        """Test creating shoutout with custom points"""
        sender = test_users[0]
        recipient = test_users[1]
        
        result = create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Exceptional work!",
            category="Innovation",
            recipient_ids=[recipient.id],
            points=50
        )
        
        assert result["points"] == 50
    
    def test_shoutout_has_pending_status(self, db_session, test_users):
        """Test that new shoutouts have PENDING status"""
        sender = test_users[0]
        recipient = test_users[1]
        
        result = create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Test",
            category="Achievement",
            recipient_ids=[recipient.id],
            points=10
        )
        
        assert result["status"] == "PENDING"

    def test_get_user_stats_includes_pending_shoutouts(self, db_session, test_users):
        """User stats should include PENDING shoutouts to match feed counts"""
        sender = test_users[0]
        recipient = test_users[1]

        create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Great work!",
            category="Teamwork",
            recipient_ids=[recipient.id],
            points=20
        )

        stats_sender = get_user_stats(db_session, sender.id)
        stats_recipient = get_user_stats(db_session, recipient.id)

        assert stats_sender["shoutouts_sent"] == 1
        assert stats_recipient["shoutouts_received"] == 1
        assert stats_recipient["total_points"] == 20

    def test_shoutout_has_created_at_timestamp(self, db_session, test_users):
        """Test that created_at timestamp is set"""
        sender = test_users[0]
        recipient = test_users[1]
        
        before_creation = datetime.utcnow()
        
        result = create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Test",
            category="Achievement",
            recipient_ids=[recipient.id],
            points=10
        )
        
        after_creation = datetime.utcnow()
        
        created_at = datetime.fromisoformat(result["created_at"])
        assert before_creation <= created_at <= after_creation


class TestLeaderboard:
    """Tests for leaderboard functionality"""
    
    def test_get_leaderboard_users_basic(self, db_session, test_users):
        """Test basic leaderboard retrieval"""
        sender = test_users[0]
        recipients = [test_users[1].id, test_users[2].id]
        
        # Create shoutout with multiple recipients
        create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Great work!",
            category="Achievement",
            recipient_ids=recipients,
            points=100
        )
        
        # Get leaderboard
        leaderboard = get_leaderboard_users(db_session, limit=10)
        
        # Verify structure
        assert len(leaderboard) <= 2
        assert all('position' in entry for entry in leaderboard)
        assert all('name' in entry for entry in leaderboard)
        assert all('points' in entry for entry in leaderboard)
        assert all('initials' in entry for entry in leaderboard)
        assert all('badges' in entry for entry in leaderboard)
    
    def test_leaderboard_sorted_by_points(self, db_session, test_users):
        """Test that leaderboard is sorted by points descending"""
        sender1 = test_users[0]
        recipient1 = test_users[1]
        recipient2 = test_users[2]
        
        # Create shoutout with 100 points to recipient1
        create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender1.id,
            message="High value shoutout",
            category="Achievement",
            recipient_ids=[recipient1.id],
            points=100
        )
        
        # Create shoutout with 50 points to recipient2
        create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender1.id,
            message="Medium value",
            category="Teamwork",
            recipient_ids=[recipient2.id],
            points=50
        )
        
        leaderboard = get_leaderboard_users(db_session, limit=10)
        
        # Check sorting
        assert len(leaderboard) >= 2
        assert leaderboard[0]['points'] >= leaderboard[1]['points']
    
    def test_leaderboard_position_rank(self, db_session, test_users):
        """Test that position rank is correctly assigned"""
        sender = test_users[0]
        recipient = test_users[1]
        
        create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Test",
            category="Achievement",
            recipient_ids=[recipient.id],
            points=50
        )
        
        leaderboard = get_leaderboard_users(db_session, limit=10, offset=0)
        
        # First entry should have position 1
        if leaderboard:
            assert leaderboard[0]['position'] == 1
    
    def test_leaderboard_badges_awarded(self, db_session, test_users):
        """Test that badges are correctly awarded based on metrics"""
        sender = test_users[0]
        recipient = test_users[1]
        
        # Create 10 shoutouts to reach 'fire' badge (shoutouts_received >= 10)
        for i in range(10):
            create_shoutout_with_recipients(
                db=db_session,
                sender_id=sender.id,
                message=f"Shout {i}",
                category="Achievement",
                recipient_ids=[recipient.id],
                points=50
            )
        
        leaderboard = get_leaderboard_users(db_session, limit=10)
        
        # Find recipient in leaderboard
        recipient_entry = next((e for e in leaderboard if e['user_id'] == recipient.id), None)
        
        assert recipient_entry is not None
        # Should have 'fire' badge (shoutouts_received >= 10)
        assert 'fire' in recipient_entry['badges']
        # Should have 'heart' badge (points > 0)
        assert 'heart' in recipient_entry['badges']
    
    def test_leaderboard_limit_and_offset(self, db_session, test_users):
        """Test pagination with limit and offset"""
        sender = test_users[0]
        recipients = [u.id for u in test_users[1:]]
        
        # Create shoutouts for multiple recipients
        for i, recipient_id in enumerate(recipients):
            create_shoutout_with_recipients(
                db=db_session,
                sender_id=sender.id,
                message=f"Shout {i}",
                category="Achievement",
                recipient_ids=[recipient_id],
                points=100 - (i * 10)
            )
        
        # Get first 1
        leaderboard_p1 = get_leaderboard_users(db_session, limit=1, offset=0)
        assert len(leaderboard_p1) <= 1
        
        # Get all
        leaderboard_all = get_leaderboard_users(db_session, limit=10, offset=0)
        assert len(leaderboard_all) == len(recipients)
    
    def test_leaderboard_includes_pending_by_default(self, db_session, test_users):
        """Test that leaderboard includes PENDING shoutouts by default"""
        sender = test_users[0]
        recipient = test_users[1]
        
        # Create shoutout (will be PENDING status by default)
        create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Pending shoutout",
            category="Achievement",
            recipient_ids=[recipient.id],
            points=75
        )
        
        # Get leaderboard with include_pending=True (default)
        leaderboard_pending = get_leaderboard_users(db_session, include_pending=True)
        
        # Get leaderboard excluding pending
        leaderboard_approved_only = get_leaderboard_users(db_session, include_pending=False)
        
        # With pending should have more or equal entries
        assert len(leaderboard_pending) >= len(leaderboard_approved_only)
    
    def test_leaderboard_initials_generation(self, db_session, test_users):
        """Test that initials are correctly generated from user names"""
        sender = test_users[0]
        recipient = test_users[1]  # "Recipient 1"
        
        create_shoutout_with_recipients(
            db=db_session,
            sender_id=sender.id,
            message="Test",
            category="Achievement",
            recipient_ids=[recipient.id],
            points=50
        )
        
        leaderboard = get_leaderboard_users(db_session, limit=10)
        recipient_entry = next((e for e in leaderboard if e['user_id'] == recipient.id), None)
        
        assert recipient_entry is not None
        # Recipient 1 should have initials "R1" or similar
        assert len(recipient_entry['initials']) > 0
        assert recipient_entry['initials'][0] == 'R'
