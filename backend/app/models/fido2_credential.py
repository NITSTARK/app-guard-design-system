
from app import db

class Fido2Credential(db.Model):
    __tablename__ = 'fido2_credentials'

    id = db.Column(db.String(36), primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    credential_id = db.Column(db.LargeBinary, nullable=False)
    public_key = db.Column(db.LargeBinary, nullable=False)
    sign_count = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=True)

    user = db.relationship('User', backref=db.backref('fido2_credentials', lazy=True))
