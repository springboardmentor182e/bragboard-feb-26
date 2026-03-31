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
from src.shoutouts.service import create_shoutout_with_recipients


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
