
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Notification
from app import db
import uuid

notifications_bp = Blueprint('notifications_bp', __name__)

@notifications_bp.route('', methods=['GET'])
@jwt_required()
def get_notifications():
    current_user_id = get_jwt_identity()
    
    # Basic query for now, can be extended with query parameters
    notifications = Notification.query.filter_by(user_id=current_user_id).order_by(Notification.timestamp.desc()).all()
    
    output = []
    for notif in notifications:
        output.append({
            "id": notif.id,
            "type": notif.type,
            "title": notif.title,
            "message": notif.message,
            "read": notif.read,
            "timestamp": notif.timestamp.isoformat(),
            "data": notif.data
        })
        
    return jsonify({"success": True, "data": output})

@notifications_bp.route('/<notificationId>/read', methods=['PUT'])
@jwt_required()
def mark_notification_as_read(notificationId):
    current_user_id = get_jwt_identity()
    notif = Notification.query.filter_by(id=notificationId, user_id=current_user_id).first()
    
    if not notif:
        return jsonify({"success": False, "error": {"code": "NOT_FOUND", "message": "Notification not found"}}), 404
        
    notif.read = True
    db.session.commit()
    
    return jsonify({"success": True, "message": "Notification marked as read"})

@notifications_bp.route('/read-all', methods=['PUT'])
@jwt_required()
def mark_all_notifications_as_read():
    current_user_id = get_jwt_identity()
    
    Notification.query.filter_by(user_id=current_user_id, read=False).update({'read': True})
    db.session.commit()
    
    return jsonify({"success": True, "message": "All notifications marked as read"})

@notifications_bp.route('/<notificationId>', methods=['DELETE'])
@jwt_required()
def delete_notification(notificationId):
    current_user_id = get_jwt_identity()
    notif = Notification.query.filter_by(id=notificationId, user_id=current_user_id).first()
    
    if not notif:
        return jsonify({"success": False, "error": {"code": "NOT_FOUND", "message": "Notification not found"}}), 404
        
    db.session.delete(notif)
    db.session.commit()
    
    return jsonify({"success": True, "message": "Notification deleted"})
