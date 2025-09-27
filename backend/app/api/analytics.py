
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

analytics_bp = Blueprint('analytics_bp', __name__)

@analytics_bp.route('/usage', methods=['GET'])
@jwt_required()
def get_usage_analytics():
    # Mock response
    return jsonify({
        "success": True,
        "data": {
            "totalSessions": 120,
            "averageSessionDuration": 1800,
            "mostUsedApps": [
                {"appName": "Google Chrome", "usageTime": 10800, "sessions": 30},
                {"appName": "Visual Studio Code", "usageTime": 21600, "sessions": 25},
            ],
            "securityEvents": 15,
            "filesAccessed": 50
        }
    })

@analytics_bp.route('/security', methods=['GET'])
@jwt_required()
def get_security_analytics():
    # Mock response
    return jsonify({
        "success": True,
        "data": {
            "threatsDetected": 5,
            "threatsBlocked": 3,
            "unauthorizedAccess": 2,
            "securityScore": 92,
            "riskLevel": "low",
            "recommendations": [
                {"type": "2fa", "message": "Enable two-factor authentication for better security.", "priority": "medium"}
            ]
        }
    })
