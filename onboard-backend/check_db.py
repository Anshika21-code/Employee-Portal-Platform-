from app import create_app
from app.models.database import db, Task, Employee

app = create_app()
with app.app_context():
    emps = Employee.query.all()
    for e in emps:
        print(f'Employee: {e.name} (id={e.id}) → {len(e.tasks)} tasks')
        for t in e.tasks:
            print(f'  - {t.title} | status={t.status}')