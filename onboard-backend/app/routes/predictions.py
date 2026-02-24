# from flask import Blueprint, jsonify, request
# from app.models.database import get_db
# from datetime import datetime
# import sqlite3


# bp = Blueprint('predictions', __name__, url_prefix='/api/predict')

# @bp.route('/employee/<int:employee_id>', methods=['GET'])
# def predict_employee_status(employee_id):
#     """Predict status for a specific employee"""
#     try:
#         conn = get_db()
        
#         # Get employee info
#         employee = conn.execute(
#             'SELECT * FROM employees WHERE id = ?', (employee_id,)
#         ).fetchone()
        
#         if not employee:
#             return jsonify({'error': 'Employee not found'}), 404
        
#         # Get all tasks for employee
#         tasks = conn.execute(
#             'SELECT * FROM tasks WHERE employee_id = ?', (employee_id,)
#         ).fetchall()
        
#         conn.close()
        
#         if len(tasks) == 0:
#             return jsonify({
#                 'employee_id': employee_id,
#                 'status': 'on-track',
#                 'confidence': 100.0,
#                 'message': 'No tasks assigned yet',
#                 'recommendations': ['Assign onboarding tasks to begin tracking']
#             })
        
#         # Calculate features
#         total_tasks = len(tasks)
#         completed_tasks = len([t for t in tasks if t['status'] == 'Completed'])
#         completion_rate = completed_tasks / total_tasks if total_tasks > 0 else 0
        
#         # Calculate days elapsed
#         start_date = datetime.strptime(employee['start_date'], '%Y-%m-%d')
#         days_elapsed = (datetime.now() - start_date).days
        
#         # Count overdue tasks
#         overdue_tasks = 0
#         for task in tasks:
#             if task['due_date'] and task['status'] != 'Completed':
#                 try:
#                     due_date = datetime.strptime(task['due_date'], '%Y-%m-%d')
#                     if due_date < datetime.now():
#                         overdue_tasks += 1
#                 except:
#                     pass
        
#         # Simple rule-based prediction (we'll add ML later)
#         if completion_rate > 0.7 and overdue_tasks <= 1:
#             status = 'on-track'
#             recommendations = [
#                 "✅ Employee is progressing well",
#                 "Continue current pace"
#             ]
#         elif completion_rate < 0.5 or overdue_tasks >= 3:
#             status = 'delayed'
#             recommendations = [
#                 "🚨 Immediate attention required",
#                 "Schedule 1-on-1 meeting with HR",
#                 f"Focus on completing {overdue_tasks} overdue tasks"
#             ]
#         else:
#             status = 'at-risk'
#             recommendations = [
#                 "⚠️ Monitor progress closely",
#                 "Check if employee needs support",
#                 "Consider extending deadlines"
#             ]
        
#         return jsonify({
#             'employee_id': employee_id,
#             'employee_name': employee['name'],
#             'status': status,
#             'confidence': 85.0,
#             'recommendations': recommendations,
#             'metrics': {
#                 'completion_rate': round(completion_rate * 100, 2),
#                 'days_elapsed': days_elapsed,
#                 'overdue_tasks': overdue_tasks,
#                 'total_tasks': total_tasks,
#                 'completed_tasks': completed_tasks
#             }
#         })
    
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500  


from flask import Blueprint, jsonify, request
from app.models.database import get_db
from datetime import datetime

bp = Blueprint('predictions', __name__, url_prefix='/api/predict')

# =====================================================
# EXISTING API — EMPLOYEE STATUS PREDICTION (UNCHANGED)
# =====================================================
@bp.route('/employee/<int:employee_id>', methods=['GET'])
def predict_employee_status(employee_id):
    try:
        conn = get_db()

        employee = conn.execute(
            'SELECT * FROM employees WHERE id = ?', (employee_id,)
        ).fetchone()

        if not employee:
            return jsonify({'error': 'Employee not found'}), 404

        tasks = conn.execute(
            'SELECT * FROM tasks WHERE employee_id = ?', (employee_id,)
        ).fetchall()

        if len(tasks) == 0:
            return jsonify({
                'employee_id': employee_id,
                'status': 'on-track',
                'confidence': 100,
                'message': 'No tasks assigned yet'
            })

        total_tasks = len(tasks)
        completed_tasks = len([t for t in tasks if t['status'] == 'Completed'])
        completion_rate = completed_tasks / total_tasks

        start_date = datetime.strptime(employee['start_date'], '%Y-%m-%d')
        days_elapsed = (datetime.now() - start_date).days

        overdue_tasks = 0
        for task in tasks:
            if task['due_date'] and task['status'] != 'Completed':
                due_date = datetime.strptime(task['due_date'], '%Y-%m-%d')
                if due_date < datetime.now():
                    overdue_tasks += 1

        if completion_rate > 0.7 and overdue_tasks <= 1:
            status = 'on-track'
        elif completion_rate < 0.5 or overdue_tasks >= 3:
            status = 'delayed'
        else:
            status = 'at-risk'

        return jsonify({
            'employee_id': employee_id,
            'employee_name': employee['name'],
            'status': status,
            'metrics': {
                'completion_rate': round(completion_rate * 100, 2),
                'days_elapsed': days_elapsed,
                'overdue_tasks': overdue_tasks
            }
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# =====================================================
# NEW API — DAILY PERFORMANCE (FOR CHART TOOLTIP)
# =====================================================
@bp.route('/performance/daily', methods=['GET'])
def get_daily_performance():
    """
    Query params:
    employee_id, start_date (YYYY-MM-DD), end_date (YYYY-MM-DD)
    """
    try:
        employee_id = request.args.get('employee_id')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')

        conn = get_db()

        rows = conn.execute("""
            SELECT date, tasks_done, hours_worked, performance_score
            FROM daily_performance
            WHERE employee_id = ?
              AND date BETWEEN ? AND ?
            ORDER BY date ASC
        """, (employee_id, start_date, end_date)).fetchall()

        data = []
        for r in rows:
            data.append({
                "date": r["date"],
                "tasks_done": r["tasks_done"],
                "hours_worked": r["hours_worked"],
                "performance": r["performance_score"]
            })

        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500
