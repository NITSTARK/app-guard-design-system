
from flask import Blueprint, request, jsonify
from app.models import User
from app import db
import uuid
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({"success": False, "error": {"code": "VALIDATION_ERROR", "message": "Email, password, and name are required"}}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"success": False, "error": {"code": "VALIDATION_ERROR", "message": "User with this email already exists"}}), 400

    new_user = User(
        id=str(uuid.uuid4()),
        email=data['email'],
        name=data['name']
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": True, "data": {"id": new_user.id, "email": new_user.email, "name": new_user.name}}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"success": False, "error": {"code": "VALIDATION_ERROR", "message": "Email and password are required"}}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({"success": False, "error": {"code": "UNAUTHORIZED", "message": "Invalid credentials"}}), 401

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify({
        "success": True,
        "data": {
            "accessToken": access_token,
            "refreshToken": refresh_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "avatar": user.avatar
            }
        }
    }), 200

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user_id)
    return jsonify({"success": True, "data": {"accessToken": new_access_token}}), 200

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    from app.models import TokenBlocklist
    from datetime import datetime, timezone

    jti = get_jwt()['jti']
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    return jsonify({"success": True, "message": "Logged out successfully"}), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"success": False, "error": {"code": "NOT_FOUND", "message": "User not found"}}), 404

    return jsonify({"success": True, "data": {"id": user.id, "email": user.email, "name": user.name, "avatar": user.avatar}}), 200
