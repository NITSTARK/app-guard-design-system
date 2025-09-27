
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app) # Allow all origins for now

    # Callback for checking if a token is blocklisted
    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        from app.models import TokenBlocklist
        jti = jwt_payload["jti"]
        token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
        return token is not None

    from app.models import User, TokenBlocklist

    # Register blueprints here
    from .api.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from .api.user import user_bp
    app.register_blueprint(user_bp, url_prefix='/api/user')

    from .api.apps import apps_bp
    app.register_blueprint(apps_bp, url_prefix='/api/apps')

    from .api.files import files_bp
    app.register_blueprint(files_bp, url_prefix='/api/files')

    from .api.notifications import notifications_bp
    app.register_blueprint(notifications_bp, url_prefix='/api/notifications')

    from .api.activity import activity_bp
    app.register_blueprint(activity_bp, url_prefix='/api/activity')

    from .api.analytics import analytics_bp
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')

    from .api.devices import devices_bp
    app.register_blueprint(devices_bp, url_prefix='/api/devices')

    from .api.settings import settings_bp
    app.register_blueprint(settings_bp, url_prefix='/api/settings')

    from .api.webauthn import webauthn_bp
    app.register_blueprint(webauthn_bp, url_prefix='/api/webauthn')

    @app.route('/api/health')
    def health_check():
        return {'status': 'UP'}

    return app
