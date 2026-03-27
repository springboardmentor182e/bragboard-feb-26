import sqlite3
conn = sqlite3.connect('../bragboard.db')
c = conn.cursor()
c.execute('SELECT hashed_password FROM users WHERE email="admin@gmail.com"')
row = c.fetchone()
hash_pwd = row[0] if row else None
conn.close()
print('DB hash:', hash_pwd)

from src.auth.jwt import pwd_context, verify_password
print('verify("password", DB_hash):', verify_password('password', hash_pwd))
