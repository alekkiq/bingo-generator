import os
import time
import uuid
from flask import current_app, request, jsonify, url_for
from werkzeug.utils import secure_filename

def _allowed_file(filename: str) -> bool:
    if "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1].lower()
    allowed = current_app.config.get("ALLOWED_UPLOAD_EXTENSIONS") or current_app.config.get("ALLOWED_UPLOAD_EXTENSIONS", None)
    if allowed is None:
        allowed = {"png", "jpg", "jpeg", "webp", "svg"}
    return ext in allowed

class UploadController:
    """
    Handles direct uploads from the frontend.
    Frontend should POST multipart/form-data with the file field named 'file'
    (or 'free_center_file') — both are accepted.
    Returns JSON: { "url": "<public static URL>" } on success.
    """
    def __init__(self):
        pass

    def upload(self):
        file = request.files.get("file") or request.files.get("free_center_file")
        if not file:
            return jsonify({"error": "no file provided"}), 400

        if file.filename == "":
            return jsonify({"error": "empty filename"}), 400

        filename = secure_filename(file.filename)
        if not _allowed_file(filename):
            return jsonify({"error": "file type not allowed"}), 400

        upload_dir = current_app.config.get("UPLOAD_FOLDER")
        if not upload_dir:
            upload_dir = os.path.join(current_app.static_folder, "uploads")

        os.makedirs(upload_dir, exist_ok=True)

        prefix = str(int(time.time()))
        unique_name = f"{prefix}_{uuid.uuid4().hex}_{filename}"
        save_path = os.path.join(upload_dir, unique_name)

        file.save(save_path)

        public_url = url_for("static", filename=f"uploads/{unique_name}", _external=True)
        return jsonify({"url": public_url}), 201