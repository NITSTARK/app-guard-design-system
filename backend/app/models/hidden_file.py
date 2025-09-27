
from app import db
from datetime import datetime

class HiddenFile(db.Model):
    __tablename__ = 'hidden_files'

    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    size = db.Column(db.Integer, nullable=False)
    path = db.Column(db.String(255), nullable=False)
    encrypted = db.Column(db.Boolean, default=False)
    folder = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('hidden_files', lazy=True))
