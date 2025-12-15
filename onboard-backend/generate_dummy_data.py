import sqlite3

DATABASE = "onboard.db"

def get_db():
    conn = sqlite3.connect(DATABASE)
    return conn

def insert_dummy_data():
    conn = get_db()
    cursor = conn.cursor()

    # Insert employees
    employees = [
        ("Rahul Sharma", "rahul@company.com", "Engineering", "2024-06-01"),
        ("Anjali Verma", "anjali@company.com", "HR", "2024-06-10"),
        ("Aman Gupta", "aman@company.com", "AI/ML", "2024-07-01"),
        ("Sneha Patil", "sneha@company.com", "Operations", "2024-07-05")
    ]

    cursor.executemany("""
        INSERT INTO employees (name, email, department, start_date)
        VALUES (?, ?, ?, ?)
    """, employees)

    # Insert tasks
    tasks = [
        (1, "Complete onboarding", "Submit documents and forms", "Completed", "2024-06-05"),
        (1, "React training", "Finish React basics", "In Progress", "2024-06-15"),
        (2, "HR orientation", "Learn HR tools", "Completed", "2024-06-12"),
        (3, "ML dataset review", "Review training dataset", "Not Started", "2024-07-10"),
        (4, "Policy reading", "Read company policies", "In Progress", "2024-07-12")
    ]

    cursor.executemany("""
        INSERT INTO tasks (employee_id, title, description, status, due_date)
        VALUES (?, ?, ?, ?, ?)
    """, tasks)

    conn.commit()
    conn.close()

    print(" Dummy employees & tasks inserted successfully!")

if __name__ == "__main__":
    insert_dummy_data()
