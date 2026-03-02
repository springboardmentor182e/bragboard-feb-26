from sqlalchemy.orm import Session
from sqlalchemy import desc
from src.entities.user import User


def calculate_trend(current, previous):
    if current > previous:
        return "UP"
    elif current < previous:
        return "DOWN"
    else:
        return "STABLE"


def get_full_ranking(db: Session):
    users = db.query(User).order_by(desc(User.score)).all()

    ranking = []

    for index, user in enumerate(users):
        trend = calculate_trend(user.score, user.last_month_score)

        ranking.append({
            "rank": index + 1,
            "id": user.id,
            "name": user.name,
            "points": user.score,
            "trend": trend
        })

    return ranking


def get_top_three(db: Session):
    return get_full_ranking(db)[:3]


def get_stats(db: Session):
    users = db.query(User).all()

    if not users:
        return {
            "top_score": 0,
            "total_users": 0,
            "average_score": 0,
            "growth_percent": 0
        }

    top_score = max(user.score for user in users)
    total_users = len(users)
    avg_score = sum(user.score for user in users) // total_users

    total_current = sum(user.score for user in users)
    total_previous = sum(user.last_month_score for user in users)

    if total_previous == 0:
        growth = 0
    else:
        growth = ((total_current - total_previous) / total_previous) * 100

    return {
        "top_score": top_score,
        "total_users": total_users,
        "average_score": avg_score,
        "growth_percent": round(growth, 2)
    }