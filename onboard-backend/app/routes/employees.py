from flask import Blueprint, request, jsonify
from app.models.database import db, Employee
from datetime import datetime, date

employees_bp = Blueprint("employees", __name__)


# =========================
# GET EMPLOYEES
# =========================
@employees_bp.route("/employees", methods=["GET"])
def get_employees():
    try:
        employees = Employee.query.all()
        today = date.today()
        data = []

        for emp in employees:
            total = len(emp.tasks)
            completed = sum(1 for t in emp.tasks if t.status == "Completed")
            progress = round((completed / total) * 100) if total > 0 else 0

            has_overdue = any(
                t.due_date and t.due_date < today and t.status != "Completed"
                for t in emp.tasks
            )

            if total == 0:
                status = "on-track"
            elif progress >= 70:
                status = "on-track"
            elif has_overdue and progress < 30:
                status = "delayed"
            else:
                status = "at-risk"

            data.append({
                "id": emp.id,
                "name": emp.name,
                "role": emp.role or "",
                "department": emp.department or "",
                "joined_date": emp.joined_date.strftime("%Y-%m-%d") if emp.joined_date else "",
                "progress": progress,
                "tasks_completed": completed,
                "tasks_total": total,
                "status": status,
                "remarks": emp.remarks or ""
            })

        return jsonify(data), 200

    except Exception as e:
        print("GET /employees error:", e)
        return jsonify({"error": str(e)}), 500


# =========================
# CREATE EMPLOYEE
# =========================
@employees_bp.route("/employees", methods=["POST"])
def create_employee():
    try:
        data = request.json

        if not data.get("name"):
            return jsonify({"error": "Name is required"}), 400

        joined_date = None
        if data.get("joined_date"):
            joined_date = datetime.strptime(data["joined_date"], "%Y-%m-%d")

        new_emp = Employee(
            name=data["name"],
            role=data.get("role", ""),
            department=data.get("department", ""),
            joined_date=joined_date,
            remarks=data.get("remarks", "")
        )

        db.session.add(new_emp)
        db.session.commit()

        return jsonify({"message": "Employee created", "id": new_emp.id}), 201

    except Exception as e:
        db.session.rollback()
        print("POST /employees error:", e)
        return jsonify({"error": str(e)}), 500


# =========================
# DELETE EMPLOYEE
# =========================
@employees_bp.route("/employees/<int:id>", methods=["DELETE"])
def delete_employee(id):
    try:
        employee = Employee.query.get_or_404(id)
        db.session.delete(employee)
        db.session.commit()
        return jsonify({"message": "Employee deleted"}), 200

    except Exception as e:
        db.session.rollback()
        print("DELETE /employees error:", e)
        return jsonify({"error": str(e)}), 500