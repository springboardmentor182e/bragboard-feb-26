from src.entities.shoutout_recipient import ShoutOutRecipient
from sqlalchemy import inspect as sa_inspect

mapper = sa_inspect(ShoutOutRecipient)
print("ShoutOutRecipient Model Columns:")
for column in mapper.columns:
    print(f"  - {column.name} (type: {column.type})")

print("\nTable Info:")
print(f"  Table name: {ShoutOutRecipient.__tablename__}")
print(f"  Table object columns: {list(ShoutOutRecipient.__table__.columns.keys())}")
