 
import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# =======================
# Employee Model
# =======================

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100))
    department = db.Column(db.String(100))
    joined_date = db.Column(db.Date)
    remarks = db.Column(db.Text)

    tasks = db.relationship("Task", backref="employee", lazy=True)

# =======================
# Task Model
# =======================

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)  
    due_date = db.Column(db.Date)
    status = db.Column(db.String(50), default="Not Started")
    employee_id = db.Column(db.Integer, db.ForeignKey("employee.id"))    
DATABASE = 'onboard.db'
 