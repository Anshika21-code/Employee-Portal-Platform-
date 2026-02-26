from flask import Blueprint, jsonify
from app.models.database import Employee, Task
from app.ml.model import predict_status, train_model
from datetime import date

predictions_bp = Blueprint("predictions", __name__)


@predictions_bp.route("/predict/train", methods=["POST"])
def train():
    """Endpoint to retrain the model"""
    try:
        train_model()
        return jsonify({"message": "Model trained successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@predictions_bp.route("/predict/employee/<int:employee_id>", methods=["GET"])
def predict_employee(employee_id):
    """Predict status for a single employee"""
    try:
        emp = Employee.query.get_or_404(employee_id)
        today = date.today()

        total = len(emp.tasks)
        completed = sum(1 for t in emp.tasks if t.status == "Completed")
        overdue = sum(
            1 for t in emp.tasks
            if t.due_date and t.due_date < today and t.status != "Completed"
        )
        progress = round((completed / total) * 100) if total > 0 else 0
        days_since_joining = (today - emp.joined_date).days if emp.joined_date else 0

        prediction, confidence = predict_status(
            progress, total, completed, overdue, days_since_joining
        )

        return jsonify({
            "employee_id": employee_id,
            "name": emp.name,
            "prediction": prediction,
            "confidence": confidence,
            "features": {
                "progress": progress,
                "tasks_total": total,
                "tasks_completed": completed,
                "tasks_overdue": overdue,
                "days_since_joining": days_since_joining
            }
        }), 200

    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"error": str(e)}), 500


@predictions_bp.route("/predict/all", methods=["GET"])
def predict_all():
    """Predict status for all employees"""
    try:
        employees = Employee.query.all()
        today = date.today()
        results = []

        for emp in employees:
            total = len(emp.tasks)
            completed = sum(1 for t in emp.tasks if t.status == "Completed")
            overdue = sum(
                1 for t in emp.tasks
                if t.due_date and t.due_date < today and t.status != "Completed"
            )
            progress = round((completed / total) * 100) if total > 0 else 0
            days_since_joining = (today - emp.joined_date).days if emp.joined_date else 0

            prediction, confidence = predict_status(
                progress, total, completed, overdue, days_since_joining
            )

            results.append({
                "employee_id": emp.id,
                "name": emp.name,
                "prediction": prediction,
                "confidence": confidence
            })

        return jsonify(results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500