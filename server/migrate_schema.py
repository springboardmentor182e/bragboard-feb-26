import sys
import os

# Change to server directory
os.chdir(os.path.dirname(__file__))
sys.path.insert(0, os.getcwd())

# Now import from src
from src.database.core import engine
from sqlalchemy import text

print("🔄 Checking and adding new columns to shoutouts table...")

try:
    with engine.connect() as conn:
        # Check if columns exist, if not add them
        statements = [
            """
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                              WHERE table_name='shoutouts' AND column_name='is_deleted') THEN
                    ALTER TABLE shoutouts ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;
                    RAISE NOTICE 'Added is_deleted column';
                END IF;
            END $$;
            """,
            """
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                              WHERE table_name='shoutouts' AND column_name='deleted_at') THEN
                    ALTER TABLE shoutouts ADD COLUMN deleted_at TIMESTAMP DEFAULT NULL;
                    RAISE NOTICE 'Added deleted_at column';
                END IF;
            END $$;
            """,
            """
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                              WHERE table_name='shoutouts' AND column_name='is_archived') THEN
                    ALTER TABLE shoutouts ADD COLUMN is_archived BOOLEAN DEFAULT FALSE;
                    RAISE NOTICE 'Added is_archived column';
                END IF;
            END $$;
            """,
            """
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                              WHERE table_name='shoutouts' AND column_name='archived_at') THEN
                    ALTER TABLE shoutouts ADD COLUMN archived_at TIMESTAMP DEFAULT NULL;
                    RAISE NOTICE 'Added archived_at column';
                END IF;
            END $$;
            """,
            """
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                              WHERE table_name='shoutouts' AND column_name='updated_at') THEN
                    ALTER TABLE shoutouts ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
                    RAISE NOTICE 'Added updated_at column';
                END IF;
            END $$;
            """,
            """
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                              WHERE table_name='shoutouts' AND column_name='is_edited') THEN
                    ALTER TABLE shoutouts ADD COLUMN is_edited BOOLEAN DEFAULT FALSE;
                    RAISE NOTICE 'Added is_edited column';
                END IF;
            END $$;
            """,
            """
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                              WHERE table_name='shoutouts' AND column_name='edited_at') THEN
                    ALTER TABLE shoutouts ADD COLUMN edited_at TIMESTAMP DEFAULT NULL;
                    RAISE NOTICE 'Added edited_at column';
                END IF;
            END $$;
            """
        ]
        
        for stmt in statements:
            try:
                conn.execute(text(stmt))
                conn.commit()
            except Exception as e:
                print(f"⚠️  {e}")
        
        print("✅ Database schema updated successfully!")
        
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
