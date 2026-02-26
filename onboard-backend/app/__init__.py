# from flask import Flask
# from flask_cors import CORS

# from app.models.database import db
# from app.routes.employees import employees_bp
# from app.routes.tasks import tasks_bp
# from app.routes.dashboard import dashboard_bp


# def create_app():
#     app = Flask(__name__)

#     # Database config
#     app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///onboard.db"
#     app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#     # Enable CORS
#     CORS(app)

#     # Initialize DB
#     db.init_app(app)

#     with app.app_context():
#         db.create_all()

#     # Register Blueprints
#     app.register_blueprint(employees_bp, url_prefix="/api")
#     app.register_blueprint(tasks_bp, url_prefix="/api")
#     app.register_blueprint(dashboard_bp, url_prefix="/api")

#     return app

# app/__init__.py
from flask import Flask
from flask_cors import CORS
from app.models.database import db
from app.routes.employees import employees_bp
from app.routes.tasks import tasks_bp
from app.routes.dashboard import dashboard_bp

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///onboard.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.register_blueprint(employees_bp, url_prefix="/api")
    app.register_blueprint(tasks_bp, url_prefix="/api")
    app.register_blueprint(dashboard_bp, url_prefix="/api")
    return app