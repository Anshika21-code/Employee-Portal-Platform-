from app import create_app
from app.models.database import db, Task
from datetime import date, timedelta

app = create_app()
with app.app_context():
    # Add 3 test tasks to Mini Arora (id=3)
    test_tasks = [
        Task(employee_id=3, title="Submit ID Proof",       status="Not Started", due_date=date.today() + timedelta(days=2)),
        Task(employee_id=3, title="Watch HR Orientation",  status="Not Started", due_date=date.today() + timedelta(days=4)),
        Task(employee_id=3, title="Complete Tax Forms",    status="Not Started", due_date=date.today() - timedelta(days=1)),  # overdue
    ]
    db.session.add_all(test_tasks)
    db.session.commit()
    print("✅ Tasks added! Now refresh your browser.")

    # Confirm
    tasks = Task.query.filter_by(employee_id=3).all()
    for t in tasks:
        print(f"  - {t.title} | {t.status} | due {t.due_date}")