from sqlalchemy.orm import Session
from sqlalchemy import desc
from src.entities.user import User

def calculate_trend(current, previous):

    if current > previous:
        return "up"
    elif current < previous:
        return "down"
    else:
        return "stable"


def get_full_ranking(db: Session):

    users = db.query(User).order_by(desc(User.score)).all()

    ranking = []

    for index, user in enumerate(users):

        ranking.append({
            "rank": index + 1,
            "id": user.id,
            "name": user.name,
            "department": user.department,
            "points": user.score,
            "badges": user.badges,
            "trend": calculate_trend(user.score, user.last_month_score)
        })

    return ranking


def get_top_three(db: Session):

    return get_full_ranking(db)[:3]


def get_stats(db: Session):

    users = db.query(User).all()

    if not users:
        return {
            "top_score": 0,
            "total_badges": 0,
            "growth_percent": 0
        }

    top_score = max(user.score for user in users)

    total_badges = sum(user.badges for user in users)

    total_current = sum(user.score for user in users)
    total_previous = sum(user.last_month_score for user in users)

    growth = 0

    if total_previous != 0:
        growth = ((total_current - total_previous) / total_previous) * 100

    return {
        "top_score": top_score,
        "total_badges": total_badges,
        "growth_percent": round(growth, 2)
    }