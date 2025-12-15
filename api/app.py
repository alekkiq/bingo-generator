from flask import Flask, request, jsonify, make_response, url_for
from flask_cors import CORS

app = Flask(__name__, static_folder = "../static", template_folder = "templates")
CORS(app)

if __name__ == "__main__":
    app.run(host = "127.0.0.1", port = 3000, debug = True)