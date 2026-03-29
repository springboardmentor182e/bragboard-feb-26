from sqlalchemy import text
from sqlalchemy.orm import Session

def get_all_shoutouts(db: Session):
    result = db.execute(text("""
        SELECT id, sender, message, department, date
        FROM shoutouts
        ORDER BY id DESC
    """))

    rows = result.fetchall()

    return [
        {
            "id": row.id,
            "sender": row.sender,
            "message": row.message,
            "department": row.department,
            "date": str(row.date),
        }
        for row in rows
    ]


def delete_shoutout(db: Session, shoutout_id: int):
    db.execute(
        text("DELETE FROM shoutouts WHERE id = :id"),
        {"id": shoutout_id}
    )
    db.commit()
    return {"message": "Shoutout deleted successfully"}