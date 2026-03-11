import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="bragboard_db",
    user="postgres",
    password="reshma894",
    port="5432"
)

cursor = conn.cursor()
