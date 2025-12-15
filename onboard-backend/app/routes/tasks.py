from flask import Blueprint, jsonify, request
from app.models.database import get_db

bp = Blueprint('tasks', __name__, url_prefix='/api/tasks')

@bp.route('/employee/<int:employee_id>', methods=['GET'])
def get_employee_tasks(employee_id):
    conn = get_db()
    tasks = conn.execute('SELECT * FROM tasks WHERE employee_id = ?', (employee_id,)).fetchall()
    conn.close()
    return jsonify([dict(task) for task in tasks])

@bp.route('', methods=['POST'])
def create_task():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO tasks (employee_id, title, description, status, due_date)
        VALUES (?, ?, ?, ?, ?)
    ''', (data['employee_id'], data['title'], data.get('description'), 
          data.get('status', 'Not Started'), data.get('due_date')))
    conn.commit()
    task_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': task_id, 'message': 'Task created'}), 201

@bp.route('/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.json
    conn = get_db()
    conn.execute('''
        UPDATE tasks SET status = ? WHERE id = ?
    ''', (data['status'], id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Task updated'})

@bp.route('/<int:id>', methods=['DELETE'])
def delete_task(id):
    conn = get_db()
    conn.execute('DELETE FROM tasks WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Task deleted'})