import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="bragboard_db",
    user="postgres",
    password="yourpassword",
    port="5432"
)

cursor = conn.cursor()