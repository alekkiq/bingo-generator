from flask import Flask, request, jsonify, make_response, url_for, redirect
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge, HTTPException
import json

import config

from api.model.generator import CardGenerator
from api.controllers.cards import CardsController
from api.controllers.upload import UploadController


app = Flask(__name__, static_folder = "static")
app.config.from_object(config)
CORS(app)

generator = CardGenerator()
controller = CardsController(generator)
uploader = UploadController()

@app.route("/")
def index():
    return redirect(url_for("html_cards"))


@app.get("/api/cards")
def api_cards():
    return controller.json_cards()


@app.get("/api/preview")
def preview_card():
    return controller.preview_card()


@app.get("/api/html")
def html_cards():
    return controller.html_cards()


@app.post("/api/upload")
def api_upload():
    return uploader.upload()


@app.errorhandler(RequestEntityTooLarge)
def handle_too_large(e):
    return jsonify({"error": "file too large"}), 413



@app.errorhandler(HTTPException)
def handle_exception(e):
    response = e.get_response()
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response


if __name__ == "__main__":
    app.run(host = "127.0.0.1", port = 3000, debug = True)