from flask import Blueprint, jsonify, request
from app.models.database import db, Task, Employee
from datetime import datetime

tasks_bp = Blueprint("tasks", __name__, url_prefix="/api/tasks")

# =========================
# GET TASKS OF AN EMPLOYEE
# =========================
@tasks_bp.route("/employee/<int:employee_id>", methods=["GET"])
def get_employee_tasks(employee_id):
    tasks = Task.query.filter_by(employee_id=employee_id).all()

    return jsonify([
        {
            "id": t.id,
            "title": t.title,
            "status": t.status,
            "employee_id": t.employee_id
        }
        for t in tasks
    ])


# =========================
# CREATE TASK
# =========================
@tasks_bp.route("/", methods=["POST"])
def create_task():
    data = request.json

    new_task = Task(
        title=data["title"],
        description=data.get("description"),
        due_date=datetime.strptime(data["due_date"], "%Y-%m-%d"),
        employee_id=data["employee_id"],
        status="Not Started"
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({"message": "Task created"}), 201

# =========================
# UPDATE TASK
# =========================
@tasks_bp.route("/<int:id>", methods=["PUT"])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.json

    task.status = data.get("status", task.status)

    db.session.commit()

    return jsonify({"message": "Task updated"})


# =========================
# DELETE TASK
# =========================
@tasks_bp.route("/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted"})