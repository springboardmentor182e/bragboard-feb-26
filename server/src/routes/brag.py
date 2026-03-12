from fastapi import APIRouter
from database.core import get_db

router = APIRouter()

@router.get("/brags")
def get_brags():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM brags ORDER BY id DESC")
    result = cursor.fetchall()

    db.close()
    return result


@router.post("/brags")
def create_brag(brag: dict):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO brags (author, content) VALUES (%s,%s)",
        (brag["author"], brag["content"])
    )

    db.commit()
    db.close()

    return {"message": "Brag created"}


@router.post("/brags/{brag_id}/like")
def like_brag(brag_id: int):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "UPDATE brags SET likes = likes + 1 WHERE id=%s",
        (brag_id,)
    )

    db.commit()
    db.close()

    return {"message": "Liked"}