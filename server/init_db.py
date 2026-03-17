"""
Database initialization script
Run this to create tables and seed initial data
"""
import sys
sys.path.append('src')

from database.core import engine, init_db
from entities.user import Base, User, RoleEnum
from sqlalchemy.orm import Session
from auth.service import hash_password

def create_tables():
    """Create all tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Tables created successfully!")

def seed_data():
    """Insert initial data"""
    print("\nSeeding initial data...")
    
    db = Session(bind=engine)
    
    try:
        # Check if admin already exists
        existing_admin = db.query(User).filter(User.email == "admin@bragboard.com").first()
        if existing_admin:
            print("✓ Admin user already exists")
        else:
            # Create admin user
            admin = User(
                name="Admin User",
                email="admin@bragboard.com",
                password=hash_password("admin123"),
                department="Management",
                role=RoleEnum.admin
            )
            db.add(admin)
            print("✓ Created admin user (email: admin@bragboard.com, password: admin123)")
        
        # Create sample employees
        sample_employees = [
            {
                "name": "John Doe",
                "email": "john@bragboard.com",
                "password": hash_password("password123"),
                "department": "Engineering",
                "role": RoleEnum.employee
            },
            {
                "name": "Jane Smith",
                "email": "jane@bragboard.com",
                "password": hash_password("password123"),
                "department": "Marketing",
                "role": RoleEnum.employee
            },
            {
                "name": "Bob Johnson",
                "email": "bob@bragboard.com",
                "password": hash_password("password123"),
                "department": "Sales",
                "role": RoleEnum.employee
            }
        ]
        
        for emp_data in sample_employees:
            existing = db.query(User).filter(User.email == emp_data["email"]).first()
            if not existing:
                employee = User(**emp_data)
                db.add(employee)
                print(f"✓ Created employee: {emp_data['name']}")
        
        db.commit()
        print("\n✓ Database seeded successfully!")
        
    except Exception as e:
        db.rollback()
        print(f"✗ Error seeding data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    print("=" * 50)
    print("BragBoard Database Initialization")
    print("=" * 50)
    
    try:
        create_tables()
        seed_data()
        
        print("\n" + "=" * 50)
        print("Database setup complete!")
        print("=" * 50)
        print("\nDefault credentials:")
        print("  Admin: admin@bragboard.com / admin123")
        print("  User:  john@bragboard.com / password123")
        print("\n")
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        sys.exit(1)
