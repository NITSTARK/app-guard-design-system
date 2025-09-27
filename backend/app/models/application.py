
from app import db

class Application(db.Model):
    __tablename__ = 'applications'

    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    icon = db.Column(db.String(200), nullable=True)
    path = db.Column(db.String(255), nullable=False)
    isLocked = db.Column(db.Boolean, default=False, nullable=False)
    lastUsed = db.Column(db.DateTime, nullable=True)
    usageTime = db.Column(db.Integer, default=0) # in seconds
    schedule_enabled = db.Column(db.Boolean, default=False)
    schedule_startTime = db.Column(db.String(5), nullable=True) # HH:MM
    schedule_endTime = db.Column(db.String(5), nullable=True) # HH:MM
    schedule_days = db.Column(db.JSON, nullable=True) # ["monday", ...]
