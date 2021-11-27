from flask import Flask, Blueprint, json, request, jsonify, Response
from app.mongo_connection import *
from bson.objectid import *


navigator_api = Blueprint(
    'navigator_api', __name__, url_prefix='/api/navigator')

m = MongoConnection()

# @navigator_api.route('/apitest', methods=['GET'])
# def api_demonstration():
#     m = MongoConnection()
#     response = {
#         'name': 'ISU',
#         'website': 'ilstu.edu',
#         'position': 1
#     }
#     m.db['tables'].insert_one(response)
    
#     payload = m.db['tables'].find_one()
#     payload = json.dumps(payload, default=str)

#     return jsonify(payload)

# CRUD FOR TABLES
@navigator_api.route('/tables', methods=['GET'])
def get_tables():
    response = m.read_all('tables', {})
    response = json.dumps(response, default = str)

    if response is None:
        response = Response(response="Bad Request",
                    status=404,
                    mimetype='application/json')
    return jsonify(response)

@navigator_api.route('/table', methods=['GET'])
def get_table():
    if request.args.get('_id') is not None:
        search = request.args.get('_id')
        response = m.read_one('tables', {'_id': ObjectID(search)})
    elif request.args.get('number') is not None:
        search = request.args.get('number')
        response = m.read_one('tables', {'number': search})
    else:
        response = Response(response="Bad Request",
                    status=404,
                    mimetype='application/json')
                    
    if response is None:
        response = Response(response="Bad Request",
                    status=404,
                    mimetype='application/json')
    else:
        response = json.dumps(response, default=str)
        response = jsonify(response)
    return response
    