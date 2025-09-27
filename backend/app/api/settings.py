
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

settings_bp = Blueprint('settings_bp', __name__)

@settings_bp.route('/system', methods=['GET'])
@jwt_required()
def get_system_settings():
    # Mock response
    return jsonify({
        "success": True,
        "data": {
            "autoLock": {
                "enabled": True,
                "timeout": 300
            },
            "notifications": {
                "enabled": True,
                "types": ["security", "access", "updates"]
            },
            "backup": {
                "enabled": False,
                "frequency": "weekly",
                "location": "/path/to/backup"
            }
        }
    })
