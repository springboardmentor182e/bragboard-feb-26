import psycopg2


def get_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="bragboard_db",
        user="postgres",
        password="reshma894" 
    )

    return conn
