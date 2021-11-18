from flask import Flask, Blueprint, json, request, jsonify
from app.mongo_connection import *


navigator_api = Blueprint(
    'navigator_api', __name__, url_prefix='/api/navigator')

@navigator_api.route('/apitest', methods=['GET'])
def api_demonstration():
    m = MongoConnection()
    response = {
        'name': 'ISU',
        'website': 'ilstu.edu',
        'position': 1
    }
    m.db['tables'].insert_one(response)
    
    payload = m.db['tables'].find_one()
    payload = json.dumps(payload, default=str)

    return jsonify(payload)

