# from flask import Blueprint, jsonify
# from app.models.database import Employee, Task

# dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/api/dashboard")

# @dashboard_bp.route("/stats", methods=["GET"])
# def dashboard_stats():
#     total_employees = Employee.query.count()

#     total_tasks = Task.query.count()
#     completed_tasks = Task.query.filter(Task.status == "Completed").count()
#     pending_tasks = Task.query.filter(Task.status != "Completed").count()

#     completion_rate = int((completed_tasks / total_tasks) * 100) if total_tasks > 0 else 0

#     return jsonify({
#         "total_employees": total_employees,
#         "pending_tasks": pending_tasks,
#         "completion_rate": completion_rate
#     })

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