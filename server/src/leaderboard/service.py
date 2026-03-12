from src.db import get_connection


def get_full_leaderboard():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT name, department, points, badges, trend
        FROM users
        ORDER BY points DESC
    """)

    rows = cur.fetchall()

    result = []
    rank = 1

    for r in rows:
        result.append({
            "rank": rank,
            "name": r[0],
            "department": r[1],
            "points": r[2],
            "badges": r[3],
            "trend": r[4]
        })
        rank += 1

    return result


def get_top_users():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT name, department, points, badges, trend
        FROM users
        ORDER BY points DESC
        LIMIT 3
    """)

    rows = cur.fetchall()

    result = []
    rank = 1

    for r in rows:
        result.append({
            "rank": rank,
            "name": r[0],
            "department": r[1],
            "points": r[2],
            "badges": r[3],
            "trend": r[4]
        })
        rank += 1

    return result


def get_stats():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT SUM(points), SUM(badges) FROM users")

    total_points, total_badges = cur.fetchone()

    growth_percent = round((total_points / 10000) * 100, 2)

    return {
        "total_points": total_points,
        "total_badges": total_badges,
        "growth_percent": growth_percent
    }


def search_users(name):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT name, department, points, badges, trend FROM users WHERE name ILIKE %s",
        (f"%{name}%",)
    )

    rows = cur.fetchall()

    result = []
    for r in rows:
        result.append({
            "name": r[0],
            "department": r[1],
            "points": r[2],
            "badges": r[3],
            "trend": r[4]
        })

    return result


def filter_department(dept):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT name, department, points, badges, trend FROM users WHERE department=%s ORDER BY points DESC",
        (dept,)
    )

    rows = cur.fetchall()

    result = []
    rank = 1

    for r in rows:
        result.append({
            "rank": rank,
            "name": r[0],
            "department": r[1],
            "points": r[2],
            "badges": r[3],
            "trend": r[4]
        })
        rank += 1

    return result