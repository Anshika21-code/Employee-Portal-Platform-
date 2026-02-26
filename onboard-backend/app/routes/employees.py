from flask import Blueprint, request, jsonify
from app.models.database import db, Employee
from datetime import datetime

employees_bp = Blueprint("employees", __name__)


# =========================
# GET EMPLOYEES
# =========================

@employees_bp.route("/employees", methods=["GET"])
def get_employees():
    employees = Employee.query.all()

    data = []
    for emp in employees:
        data.append({
            "id": emp.id,
            "name": emp.name,
            "role": emp.role,
            "department": emp.department,
            "joined_date": emp.joined_date.strftime("%Y-%m-%d") if emp.joined_date else "",
            "progress": 0,
            "tasks_completed": 0,
            "tasks_total": 0,
            "status": "on-track"
        })

    return jsonify(data)


# =========================
# CREATE EMPLOYEE
# =========================

# @employees_bp.route("/api/employees", methods=["POST"])
# def create_employee():
#     data = request.json

#     new_emp = Employee(
#         name=data["name"],
#         role=data["role"],
#         department=data.get("department"),
#         joined_date=datetime.strptime(data["joined_date"], "%Y-%m-%d"),
#         remarks=data.get("remarks")
#     )

#     db.session.add(new_emp)
#     db.session.commit()

#     return jsonify({"message": "Employee created"}), 201

@employees_bp.route("/employees", methods=["POST"])
def create_employee():
    data = request.json

    joined_date = None
    if data.get("joined_date"):
        joined_date = datetime.strptime(data["joined_date"], "%Y-%m-%d")

    new_emp = Employee(
        name=data["name"],
        role=data["role"],
        department=data.get("department"),
        joined_date=joined_date,
        remarks=data.get("remarks")
    )

    db.session.add(new_emp)
    db.session.commit()

    return jsonify({"message": "Employee created"}), 201

# =========================
# DELETE EMPLOYEE
# =========================

@employees_bp.route("/employees/<int:id>", methods=["DELETE"])
def delete_employee(id):
    employee = Employee.query.get_or_404(id)

    db.session.delete(employee)
    db.session.commit()

    return jsonify({"message": "Employee deleted"})