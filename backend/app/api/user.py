
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User
from app import db

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"success": False, "error": {"code": "NOT_FOUND", "message": "User not found"}}), 404

    return jsonify({
        "success": True,
        "data": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "avatar": user.avatar,
            "settings": user.settings or {},
            "createdAt": user.created_at.isoformat() if hasattr(user, 'created_at') else None,
            "lastLogin": user.last_login.isoformat() if hasattr(user, 'last_login') else None
        }
    }), 200

@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_user_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"success": False, "error": {"code": "NOT_FOUND", "message": "User not found"}}), 404

    data = request.get_json()
    if 'name' in data:
        user.name = data['name']
    if 'email' in data:
        # Add validation for email format if needed
        user.email = data['email']
    if 'avatar' in data:
        user.avatar = data['avatar']
    
    db.session.commit()
    return jsonify({"success": True, "message": "Profile updated successfully"}), 200

@user_bp.route('/settings', methods=['PUT'])
@jwt_required()
def update_user_settings():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"success": False, "error": {"code": "NOT_FOUND", "message": "User not found"}}), 404

    data = request.get_json()
    
    # Ensure settings is a dict
    if user.settings is None:
        user.settings = {}

    if 'theme' in data:
        user.settings['theme'] = data['theme']
    if 'notifications' in data:
        user.settings['notifications'] = data['notifications']
    if 'biometricEnabled' in data:
        user.settings['biometricEnabled'] = data['biometricEnabled']

    # This is necessary to inform SQLAlchemy of the change to the JSON field
    db.session.flag_modified(user, "settings")
    db.session.commit()

    return jsonify({"success": True, "message": "Settings updated successfully"}), 200
