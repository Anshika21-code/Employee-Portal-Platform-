import sqlite3

DB_PATH = "onboard.db"

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

# Check if employee already exists
cursor.execute(
    "SELECT * FROM employees WHERE email = ?",
    ("john@company.com",)
)

employee = cursor.fetchone()

if employee:
    print("Employee already exists:", dict(employee))
else:
    cursor.execute(
        """
        INSERT INTO employees (name, email, department)
        VALUES (?, ?, ?)
        """,
        ("John Doe", "john@company.com", "Engineering")
    )
    conn.commit()
    print("Demo employee inserted successfully!")

conn.close()
