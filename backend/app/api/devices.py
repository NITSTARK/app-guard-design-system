
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
import uuid

devices_bp = Blueprint('devices_bp', __name__)

@devices_bp.route('', methods=['GET'])
@jwt_required()
def get_devices():
    # Mock response
    return jsonify({
        "success": True,
        "data": [
            {
                "id": str(uuid.uuid4()),
                "name": "My MacBook Pro",
                "type": "desktop",
                "os": "macOS",
                "lastSeen": "2024-07-29T14:00:00Z",
                "trusted": True,
                "permissions": ["file_access", "app_control"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "My iPhone",
                "type": "mobile",
                "os": "iOS",
                "lastSeen": "2024-07-29T13:30:00Z",
                "trusted": True,
                "permissions": ["file_access"]
            }
        ]
    })
