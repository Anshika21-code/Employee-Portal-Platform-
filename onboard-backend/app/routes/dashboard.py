

from flask import Blueprint, jsonify
from app.models.database import Employee, Task

 
dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/dashboard/stats", methods=["GET"])
def dashboard_stats():
    try:
        total_employees = Employee.query.count()

        total_tasks = Task.query.count()
        completed_tasks = Task.query.filter(Task.status == "Completed").count()
        pending_tasks = Task.query.filter(Task.status != "Completed").count()

        completion_rate = int((completed_tasks / total_tasks) * 100) if total_tasks > 0 else 0

        return jsonify({
            "total_employees": total_employees,
            "pending_tasks": pending_tasks,
            "completion_rate": completion_rate
        })
    except Exception as e:
        print("Dashboard error:", e)
        return jsonify({"error": str(e)}), 500

#  Recent activites route
@dashboard_bp.route("/dashboard/activity", methods=["GET"])
def get_activity():
    try:
        # Get recently updated tasks
        tasks = Task.query.order_by(Task.id.desc()).limit(10).all()
        activity = []

        for t in tasks:
            emp = Employee.query.get(t.employee_id)
            if not emp:
                continue

            if t.status == "Completed":
                msg = f"{emp.name} completed {t.title}"
                type_ = "success"
            elif t.status == "In Progress":
                msg = f"{emp.name} started {t.title}"
                type_ = "info"
            else:
                msg = f"{emp.name} has pending task: {t.title}"
                type_ = "warning"

            activity.append({
                "msg": msg,
                "type": type_,
                "employee": emp.name
            })

        return jsonify(activity), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500