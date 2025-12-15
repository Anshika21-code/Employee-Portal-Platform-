from flask import Blueprint, jsonify, request
from app.models.database import get_db

bp = Blueprint('employees', __name__, url_prefix='/api/employees')

@bp.route('', methods=['GET'])
def get_employees():
    conn = get_db()
    employees = conn.execute('SELECT * FROM employees').fetchall()
    conn.close()
    return jsonify([dict(emp) for emp in employees])

@bp.route('/<int:id>', methods=['GET'])
def get_employee(id):
    conn = get_db()
    employee = conn.execute('SELECT * FROM employees WHERE id = ?', (id,)).fetchone()
    conn.close()
    if employee:
        return jsonify(dict(employee))
    return jsonify({'error': 'Employee not found'}), 404

@bp.route('', methods=['POST'])
def create_employee():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO employees (name, email, department, start_date)
        VALUES (?, ?, ?, ?)
    ''', (data['name'], data['email'], data.get('department'), data.get('start_date')))
    conn.commit()
    employee_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': employee_id, 'message': 'Employee created'}), 201