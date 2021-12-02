from flask import Flask, Response, json
from flask_cors import CORS, cross_origin
from api import navigator_api

app = Flask(__name__)
app.register_blueprint(navigator_api)
cors = CORS(app)


app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/test')
@cross_origin()
def index():
    return Response(response=json.dumps({"Status": "UP"}),
                    status=200,
                    mimetype='application/json')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)