import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
ALLOWED_UPLOAD_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "svg"}
MAX_CONTENT_LENGTH = 5 * 1024 * 1024 # 5mb