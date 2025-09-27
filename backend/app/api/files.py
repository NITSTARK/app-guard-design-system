
import os
from flask import Blueprint, request, jsonify, current_app, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from app.models import HiddenFile
from app import db
import uuid

files_bp = Blueprint('files_bp', __name__)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@files_bp.route('/hidden', methods=['POST'])
@jwt_required()
def upload_hidden_file():
    current_user_id = get_jwt_identity()
    
    if 'file' not in request.files:
        return jsonify({"success": False, "error": {"code": "VALIDATION_ERROR", "message": "No file part"}}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"success": False, "error": {"code": "VALIDATION_ERROR", "message": "No selected file"}}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_id = str(uuid.uuid4())
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file_id)
        file.save(file_path)

        new_file = HiddenFile(
            id=file_id,
            user_id=current_user_id,
            name=filename,
            type=file.mimetype,
            size=os.path.getsize(file_path),
            path=file_path,
            encrypted=request.form.get('encrypt', 'false').lower() == 'true',
            folder=request.form.get('folder')
        )
        db.session.add(new_file)
        db.session.commit()

        return jsonify({"success": True, "data": {"fileId": new_file.id, "message": "File uploaded successfully"}}), 201
    else:
        return jsonify({"success": False, "error": {"code": "VALIDATION_ERROR", "message": "File type not allowed"}}), 400

@files_bp.route('/hidden', methods=['GET'])
@jwt_required()
def get_hidden_files():
    current_user_id = get_jwt_identity()
    files = HiddenFile.query.filter_by(user_id=current_user_id).all()
    
    output = []
    for file in files:
        output.append({
            "id": file.id,
            "name": file.name,
            "type": file.type,
            "size": file.size,
            "path": file.path,
            "encrypted": file.encrypted,
            "createdAt": file.created_at.isoformat(),
            "modifiedAt": file.modified_at.isoformat()
        })

    return jsonify({"success": True, "data": {"files": output, "total": len(output)}})

@files_bp.route('/hidden/<fileId>', methods=['DELETE'])
@jwt_required()
def delete_hidden_file(fileId):
    current_user_id = get_jwt_identity()
    file = HiddenFile.query.filter_by(id=fileId, user_id=current_user_id).first()
    
    if not file:
        return jsonify({"success": False, "error": {"code": "NOT_FOUND", "message": "File not found"}}), 404

    try:
        os.remove(file.path)
    except OSError as e:
        print(f"Error deleting file {file.path}: {e}")
        # Decide if you want to proceed with DB deletion even if file deletion fails

    db.session.delete(file)
    db.session.commit()

    return jsonify({"success": True, "message": "File deleted successfully"})

@files_bp.route('/hidden/<fileId>/download', methods=['GET'])
@jwt_required()
def download_hidden_file(fileId):
    current_user_id = get_jwt_identity()
    file = HiddenFile.query.filter_by(id=fileId, user_id=current_user_id).first()

    if not file:
        return jsonify({"success": False, "error": {"code": "NOT_FOUND", "message": "File not found"}}), 404

    directory = os.path.dirname(file.path)
    filename = os.path.basename(file.path)
    
    return send_from_directory(directory, filename, as_attachment=True, attachment_filename=file.name)
