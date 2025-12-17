from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Register blueprints
    from app.routes import employees, tasks, predictions, auth
    app.register_blueprint(employees.bp)
    app.register_blueprint(tasks.bp)
    app.register_blueprint(predictions.bp)
    app.register_blueprint(auth.bp)
    
    return app