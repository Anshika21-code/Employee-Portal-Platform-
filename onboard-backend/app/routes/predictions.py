from flask import Blueprint, jsonify, request
from app.models.database import get_db
from datetime import datetime

bp = Blueprint('predictions', __name__, url_prefix='/api/predict')

@bp.route('/employee/<int:employee_id>', methods=['GET'])
def predict_employee_status(employee_id):
    """Predict status for a specific employee"""
    try:
        conn = get_db()
        
        # Get employee info
        employee = conn.execute(
            'SELECT * FROM employees WHERE id = ?', (employee_id,)
        ).fetchone()
        
        if not employee:
            return jsonify({'error': 'Employee not found'}), 404
        
        # Get all tasks for employee
        tasks = conn.execute(
            'SELECT * FROM tasks WHERE employee_id = ?', (employee_id,)
        ).fetchall()
        
        conn.close()
        
        if len(tasks) == 0:
            return jsonify({
                'employee_id': employee_id,
                'status': 'on-track',
                'confidence': 100.0,
                'message': 'No tasks assigned yet',
                'recommendations': ['Assign onboarding tasks to begin tracking']
            })
        
        # Calculate features
        total_tasks = len(tasks)
        completed_tasks = len([t for t in tasks if t['status'] == 'Completed'])
        completion_rate = completed_tasks / total_tasks if total_tasks > 0 else 0
        
        # Calculate days elapsed
        start_date = datetime.strptime(employee['start_date'], '%Y-%m-%d')
        days_elapsed = (datetime.now() - start_date).days
        
        # Count overdue tasks
        overdue_tasks = 0
        for task in tasks:
            if task['due_date'] and task['status'] != 'Completed':
                try:
                    due_date = datetime.strptime(task['due_date'], '%Y-%m-%d')
                    if due_date < datetime.now():
                        overdue_tasks += 1
                except:
                    pass
        
        # Simple rule-based prediction (we'll add ML later)
        if completion_rate > 0.7 and overdue_tasks <= 1:
            status = 'on-track'
            recommendations = [
                "✅ Employee is progressing well",
                "Continue current pace"
            ]
        elif completion_rate < 0.5 or overdue_tasks >= 3:
            status = 'delayed'
            recommendations = [
                "🚨 Immediate attention required",
                "Schedule 1-on-1 meeting with HR",
                f"Focus on completing {overdue_tasks} overdue tasks"
            ]
        else:
            status = 'at-risk'
            recommendations = [
                "⚠️ Monitor progress closely",
                "Check if employee needs support",
                "Consider extending deadlines"
            ]
        
        return jsonify({
            'employee_id': employee_id,
            'employee_name': employee['name'],
            'status': status,
            'confidence': 85.0,
            'recommendations': recommendations,
            'metrics': {
                'completion_rate': round(completion_rate * 100, 2),
                'days_elapsed': days_elapsed,
                'overdue_tasks': overdue_tasks,
                'total_tasks': total_tasks,
                'completed_tasks': completed_tasks
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500