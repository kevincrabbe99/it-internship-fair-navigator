from flask import Flask, Response, json
from flask_cors import CORS
from api import navigator_api
from app.mongo_connection import MongoConnection

app = Flask(__name__)
CORS(app)
app.register_blueprint(navigator_api)

@app.route('/')
def index():
    return Response(response=json.dumps({"Status": "UP"}),
                    status=200,
                    mimetype='application/json')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)