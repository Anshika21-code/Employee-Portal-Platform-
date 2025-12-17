from flask import Blueprint, jsonify, request
from app.models.database import get_db
import hashlib

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

def hash_password(password):
    """Simple password hashing (in production, use bcrypt)"""
    return hashlib.sha256(password.encode()).hexdigest()

@bp.route('/login', methods=['POST'])
def login():
    """Login endpoint for both admin and employees"""
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        conn = get_db()
        
        # Check if admin
        if email == 'admin@company.com' and password == 'admin123':
            conn.close()
            return jsonify({
                'success': True,
                'user': {
                    'id': 0,
                    'email': 'admin@company.com',
                    'name': 'Admin User',
                    'role': 'admin'
                },
                'message': 'Admin login successful'
            })
        
        # Check if employee exists
        employee = conn.execute(
            'SELECT * FROM employees WHERE email = ?', (email,)
        ).fetchone()
        
        conn.close()
        
        if employee:
            # Simple password check (in production, compare hashed passwords)
            # For demo, any employee can login with password "employee123"
            if password == 'employee123':
                return jsonify({
                    'success': True,
                    'user': {
                        'id': employee['id'],
                        'email': employee['email'],
                        'name': employee['name'],
                        'department': employee['department'],
                        'role': 'employee'
                    },
                    'message': 'Employee login successful'
                })
            else:
                return jsonify({'error': 'Invalid password'}), 401
        else:
            return jsonify({'error': 'User not found'}), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/verify', methods=['POST'])
def verify_token():
    """Verify if user session is valid (simplified)"""
    try:
        data = request.json
        user = data.get('user')
        
        if user:
            return jsonify({'valid': True, 'user': user})
        else:
            return jsonify({'valid': False}), 401
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/logout', methods=['POST'])
def logout():
    """Logout endpoint"""
    return jsonify({'success': True, 'message': 'Logged out successfully'})