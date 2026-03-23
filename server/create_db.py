import psycopg2
from psycopg2 import sql

# Connect to the default postgres database
conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="",  # Since trust, no password
    host="localhost",
    port="5432"
)
conn.autocommit = True
cursor = conn.cursor()

# Create the database if it doesn't exist
cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier("bragboard")))

cursor.close()
conn.close()

print("Database 'bragboard' created successfully.")