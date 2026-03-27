import sqlite3
conn = sqlite3.connect('bragboard.db')
c = conn.cursor()
c.execute('SELECT id, email, hashed_password, role, is_active FROM users WHERE email="admin@gmail.com"')
row = c.fetchone()
print('Admin user:', row)

c.execute('DELETE FROM users WHERE email=\"admin@gmail.com\"')
print('Deleted admin:', c.rowcount)
c.execute('SELECT * FROM users LIMIT 5')
print('All users after delete:', [row for row in c.fetchall()])

conn.close()
