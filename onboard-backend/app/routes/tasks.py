from flask import Blueprint, request, jsonify
from app.models.database import db, Task, Employee
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
        data = request.json
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
        return jsonify({"error": str(e)}), 500


@tasks_bp.route("/tasks/employee/<int:employee_id>", methods=["GET"])
def get_tasks_by_employee(employee_id):
    tasks = Task.query.filter_by(employee_id=employee_id).all()
    return jsonify([{
        "id": t.id,
        "title": t.title,
        "description": t.description,
        "due_date": t.due_date.strftime("%Y-%m-%d") if t.due_date else "",
        "status": t.status,
        "employee_id": t.employee_id
    } for t in tasks])


# Handles both PUT (from frontend) and OPTIONS (CORS preflight)
@tasks_bp.route("/tasks/<int:task_id>", methods=["PUT", "OPTIONS"])
def update_task(task_id):
    if request.method == "OPTIONS":
        return jsonify({}), 200

    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json()
    new_status = data.get("status")

    allowed = ["Not Started", "In Progress", "Completed"]
    if new_status not in allowed:
        return jsonify({"error": f"Status must be one of: {allowed}"}), 400

    task.status = new_status
    db.session.commit()

    # Recalculate progress
    all_tasks = Task.query.filter_by(employee_id=task.employee_id).all()
    total = len(all_tasks)
    completed = sum(1 for t in all_tasks if t.status == "Completed")
    progress = round((completed / total) * 100) if total > 0 else 0

    # Derive status
    today = datetime.utcnow().date()
    overdue = sum(
        1 for t in all_tasks
        if t.due_date and t.due_date < today and t.status != "Completed"
    )
    if overdue >= 3 or progress < 30:
        ai_status = "delayed"
    elif overdue >= 1 or progress < 60:
        ai_status = "at-risk"
    else:
        ai_status = "on-track"

    return jsonify({
        "task": {"id": task.id, "status": task.status},
        "employee_progress": progress,
        "ai_status": ai_status
    }), 200


@tasks_bp.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    try:
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500