
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Activity
from app import db
import uuid

activity_bp = Blueprint('activity_bp', __name__)

@activity_bp.route('', methods=['GET'])
@jwt_required()
def get_activity_log():
    current_user_id = get_jwt_identity()
    
    # Basic query for now, can be extended with query parameters
    activities = Activity.query.filter_by(user_id=current_user_id).order_by(Activity.timestamp.desc()).all()
    
    output = []
    for act in activities:
        output.append({
            "id": act.id,
            "type": act.type,
            "description": act.description,
            "timestamp": act.timestamp.isoformat(),
            "details": act.details
        })
        
    return jsonify({"success": True, "data": output})

@activity_bp.route('', methods=['POST'])
@jwt_required()
def log_custom_activity():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    if not data or not data.get('type') or not data.get('description'):
        return jsonify({"success": False, "error": {"code": "VALIDATION_ERROR", "message": "Type and description are required"}}), 400

    new_activity = Activity(
        id=str(uuid.uuid4()),
        user_id=current_user_id,
        type=data['type'],
        description=data['description'],
        details=data.get('details')
    )
    db.session.add(new_activity)
    db.session.commit()

    return jsonify({"success": True, "data": {"id": new_activity.id}}), 201
