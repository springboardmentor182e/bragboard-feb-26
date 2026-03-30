import psycopg2
import sys

try:
    # Connect to default postgres database
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="",
        host="localhost"
    )
    conn.autocommit = True
    cursor = conn.cursor()
    
    # Drop the bragboard database if it exists
    cursor.execute("DROP DATABASE IF EXISTS bragboard;")
    print("✅ Dropped old database")
    
    # Create fresh database
    cursor.execute("CREATE DATABASE bragboard;")
    print("✅ Created fresh database")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)

# Now create all tables with the correct schema
try:
    from src.database.core import Base, engine
    Base.metadata.create_all(bind=engine)
    print("✅ Created all tables with correct schema")
except Exception as e:
    print(f"❌ Error creating tables: {e}")
    sys.exit(1)
