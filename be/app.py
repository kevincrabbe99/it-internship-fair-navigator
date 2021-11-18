from flask import Flask
from flask_cors import CORS
from api import navigator_api
from app.mongo_connection import MongoConnection

app = Flask(__name__)
CORS(app)
app.register_blueprint(navigator_api)

@app.route('/test')
def index():
    return 'Hello world'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
    print("Running....")