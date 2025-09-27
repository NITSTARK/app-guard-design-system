
from flask import Blueprint, request, jsonify, session
from fido2.server import Fido2Server
from fido2.webauthn import AttestedCredentialData, PublicKeyCredentialRpEntity
from fido2 import cbor
from app.models import User, Fido2Credential
from app import db
import uuid

webauthn_bp = Blueprint('webauthn_bp', __name__)

# In a real app, you would configure this properly
rp = PublicKeyCredentialRpEntity(id="localhost", name="PC App Lock")
server = Fido2Server(rp)

@webauthn_bp.route('/register/begin', methods=['POST'])
def begin_register():
    # For now, we'll use a hardcoded user
    # In a real app, you would get the user from the session
    user = User.query.first()
    if not user:
        return jsonify({"success": False, "error": "No user found"}), 404

    registration_data, state = server.register_begin(
        {
            "id": user.id.encode('utf-8'),
            "name": user.email,
            "displayName": user.name,
        },
        # You might want to fetch existing credentials for the user here
        [],
    )

    session["fido2_state"] = state
    return jsonify({"success": True, "data": cbor.decode(registration_data)})

@webauthn_bp.route('/register/complete', methods=['POST'])
def complete_register():
    user = User.query.first()
    if not user:
        return jsonify({"success": False, "error": "No user found"}), 404

    data = cbor.encode(request.get_json())
    state = session["fido2_state"]

    try:
        auth_data = server.register_complete(state, data)
    except ValueError:
        return jsonify({"success": False, "error": "Registration failed"}), 400

    credential_data = AttestedCredentialData(auth_data.credential_data)

    new_credential = Fido2Credential(
        id=str(uuid.uuid4()),
        user_id=user.id,
        credential_id=credential_data.credential_id,
        public_key=credential_data.public_key,
        sign_count=auth_data.with_attestation_verification.sign_count
    )
    db.session.add(new_credential)
    db.session.commit()

    return jsonify({"success": True, "message": "Registration successful"})

@webauthn_bp.route('/authenticate/begin', methods=['POST'])
def begin_authenticate():
    # For now, we'll allow any user to authenticate
    # In a real app, you would look up credentials by username
    credentials = Fido2Credential.query.all()
    if not credentials:
        return jsonify({"success": False, "error": "No credentials registered"}), 404

    auth_data, state = server.authenticate_begin([c.credential_id for c in credentials])
    session["fido2_state"] = state
    return jsonify({"success": True, "data": cbor.decode(auth_data)})

@webauthn_bp.route('/authenticate/complete', methods=['POST'])
def complete_authenticate():
    credentials = Fido2Credential.query.all()
    if not credentials:
        return jsonify({"success": False, "error": "No credentials registered"}), 404

    data = cbor.encode(request.get_json())
    state = session["fido2_state"]

    try:
        server.authenticate_complete(
            state,
            [c.credential_id for c in credentials],
            data
        )
    except ValueError:
        return jsonify({"success": False, "error": "Authentication failed"}), 400

    # In a real app, you would now log the user in by creating a session/JWT
    return jsonify({"success": True, "message": "Authentication successful"})
