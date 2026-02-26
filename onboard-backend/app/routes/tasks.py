# from flask import Blueprint, jsonify, request
# from app.models.database import db, Task, Employee
# from datetime import datetime

# tasks_bp = Blueprint("tasks", __name__, url_prefix="/api/tasks")

# # =========================
# # GET TASKS OF AN EMPLOYEE
# # =========================
# @tasks_bp.route("/employee/<int:employee_id>", methods=["GET"])
# def get_employee_tasks(employee_id):
#     tasks = Task.query.filter_by(employee_id=employee_id).all()

#     return jsonify([
#         {
#             "id": t.id,
#             "title": t.title,
#             "status": t.status,
#             "employee_id": t.employee_id
#         }
#         for t in tasks
#     ])


# # =========================
# # CREATE TASK
# # =========================
# @tasks_bp.route("/", methods=["POST"])
# def create_task():
#     data = request.json

#     new_task = Task(
#         title=data["title"],
#         description=data.get("description"),
#         due_date=datetime.strptime(data["due_date"], "%Y-%m-%d"),
#         employee_id=data["employee_id"],
#         status="Not Started"
#     )

#     db.session.add(new_task)
#     db.session.commit()

#     return jsonify({"message": "Task created"}), 201

# # =========================
# # UPDATE TASK
# # =========================
# @tasks_bp.route("/<int:id>", methods=["PUT"])
# def update_task(id):
#     task = Task.query.get_or_404(id)
#     data = request.json

#     task.status = data.get("status", task.status)

#     db.session.commit()

#     return jsonify({"message": "Task updated"})


# # =========================
# # DELETE TASK
# # =========================
# @tasks_bp.route("/<int:id>", methods=["DELETE"])
# def delete_task(id):
#     task = Task.query.get_or_404(id)

#     db.session.delete(task)
#     db.session.commit()

#     return jsonify({"message": "Task deleted"})

from flask import Blueprint, request, jsonify
from app.models.database import db, Task
from datetime import datetime

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        "id": t.id,
        "title": t.title,
        "description": t.description,
        "due_date": t.due_date.strftime("%Y-%m-%d") if t.due_date else "",
        "status": t.status,
        "employee_id": t.employee_id
    } for t in tasks])

@tasks_bp.route("/tasks/bulk", methods=["POST"])
def create_bulk_tasks():
    try:
        data = request.json  # expects { employee_id, tasks: [...] }
        employee_id = data.get("employee_id")
        tasks = data.get("tasks", [])

        for t in tasks:
            due_date = None
            if t.get("due_date"):
                due_date = datetime.strptime(t["due_date"], "%Y-%m-%d")

            new_task = Task(
                title=t.get("title", ""),
                description=t.get("description", ""),
                due_date=due_date,
                status="Not Started",
                employee_id=employee_id
            )
            db.session.add(new_task)

        db.session.commit()
        return jsonify({"message": "Tasks created"}), 201

    except Exception as e:
        db.session.rollback()
        print("Bulk tasks error:", e)
        return jsonify({"error": str(e)}), 500