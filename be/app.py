from flask import Flask
from api.api import navigator_api
from mongo_connection import MongoConnection

app = Flask(__name__)
app.register_blueprint(navigator_api)

@app.route('/test')
def index():
    return 'Hello world'

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8080)
    print("Running....")