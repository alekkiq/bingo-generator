import os
import time
import uuid
from flask import current_app, request, jsonify, url_for
from werkzeug.utils import secure_filename

def _allowed_file(filename: str) -> bool:
    """Returns boolean whether a file extension is allowed in config

    Args:
        filename (str): the filename to check

    Returns:
        bool: whether the filename is valid or not
    """
    if "." not in filename:
        return False
    
    ext = filename.rsplit(".", 1)[1].lower()
    allowed = current_app.config.get(
        "ALLOWED_UPLOAD_EXTENSIONS",
        {"png", "jpg", "jpeg", "webp", "svg"},
    )
    
    return ext in allowed

def _ensure_upload_dir() -> str:
    """Returns uploads directory path

    Returns:
        str: uploads pathname
    """
    upload_dir = current_app.config.get("UPLOAD_FOLDER")
    
    if upload_dir:
        return upload_dir
    
    static_base = current_app.static_folder or os.path.join(current_app.root_path, "static")
    return os.path.join(static_base, "uploads")

class UploadController:
    """
    Handles direct uploads from the frontend.
    Frontend should POST multipart/form-data with the file field named 'file'
    (or 'free_center_file') — both are accepted.
    Returns JSON: { "url": "<public static URL>" } on success.
    """

    def upload(self):
        file = request.files.get("file") or request.files.get("free_center_file")
        if not file:
            return jsonify({"error": "no file provided"}), 400

        if file.filename == "":
            return jsonify({"error": "empty filename"}), 400

        filename = secure_filename(file.filename)
        if not _allowed_file(filename):
            return jsonify({"error": "file type not allowed"}), 400

        upload_dir = _ensure_upload_dir()
        os.makedirs(upload_dir, exist_ok=True)

        prefix = str(int(time.time()))
        unique_name = f"{prefix}_{uuid.uuid4().hex}_{filename}"
        save_path = os.path.join(upload_dir, unique_name)

        file.save(save_path)

        public_url = url_for("static", filename=f"uploads/{unique_name}", _external=True)
        
        return jsonify({"url": public_url}), 201