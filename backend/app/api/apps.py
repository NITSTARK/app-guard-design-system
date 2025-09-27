
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models import Application
from app import db
import uuid

apps_bp = Blueprint('apps_bp', __name__)

# Mock function to get installed applications
def get_mock_installed_apps():
    return [
        {"id": str(uuid.uuid4()), "name": "Google Chrome", "icon": "/icons/chrome.png", "path": "/Applications/Google Chrome.app", "isLocked": False, "lastUsed": "2024-07-29T10:00:00Z", "usageTime": 3600},
        {"id": str(uuid.uuid4()), "name": "Visual Studio Code", "icon": "/icons/vscode.png", "path": "/Applications/Visual Studio Code.app", "isLocked": False, "lastUsed": "2024-07-29T12:30:00Z", "usageTime": 7200},
        {"id": str(uuid.uuid4()), "name": "Spotify", "icon": "/icons/spotify.png", "path": "/Applications/Spotify.app", "isLocked": True, "lastUsed": "2024-07-28T15:00:00Z", "usageTime": 1800},
    ]

@apps_bp.route('', methods=['GET'])
@jwt_required()
def get_apps():
    # In a real implementation, you would sync this with the database
    mock_apps = get_mock_installed_apps()
    return jsonify({"success": True, "data": mock_apps})

@apps_bp.route('/<appId>/lock', methods=['PUT'])
@jwt_required()
def lock_app(appId):
    data = request.get_json()
    if 'locked' not in data:
        return jsonify({"success": False, "error": {"code": "VALIDATION_ERROR", "message": "'locked' field is required"}}), 400

    # This is where you would update the database
    # For now, we just return a success message
    print(f"App {appId} lock status set to {data['locked']}")
    if 'schedule' in data:
        print(f"Schedule received: {data['schedule']}")

    return jsonify({"success": True, "message": f"App {appId} lock status updated."})

@apps_bp.route('/security-status', methods=['GET'])
@jwt_required()
def get_security_status():
    # Mock response
    return jsonify({
        "success": True,
        "data": {
            "totalApps": 150,
            "lockedApps": 25,
            "activeThreats": 3,
            "lastScan": "2024-07-29T08:00:00Z",
            "securityScore": 85
        }
    })

@apps_bp.route('/scan', methods=['POST'])
@jwt_required()
def scan_apps():
    # Mock response for a scan
    return jsonify({
        "success": True,
        "data": {
            "scanId": str(uuid.uuid4()),
            "status": "completed",
            "threats": [
                {"type": "malware", "app": "FreeGames.exe", "severity": "high", "description": "Detected known malware signature."},
                {"type": "suspicious", "app": "SystemOptimizer.app", "severity": "medium", "description": "App requested unusual permissions."},
            ]
        }
    })
