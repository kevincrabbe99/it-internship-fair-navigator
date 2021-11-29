from flask import Flask, Blueprint, json, request, jsonify, Response
from app.mongo_connection import *
from app.util import encode, validate
from app.user import Admin
from bson.objectid import ObjectId


navigator_api = Blueprint(
    'navigator_api', __name__, url_prefix='/api/navigator')

m = MongoConnection()

# CRUD FOR TABLES
# ALL THESE WILL REQUIRE AN AUTH HEADER, NOT SURE HOW TO IMPLEMENT THAT YET NEEDS SOME RESEARCH
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
        response = m.read_one('tables', {'_id': ObjectId(search)})
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
    
@navigator_api.route('/table/update', methods=['PUT'])
def update_table():
    req_json = request.json
    id = req_json['_id']
    number = req_json['number']
    company = req_json['company']
    marked = req_json['marked']

    if id and number and company and marked and request.method == 'PUT':
        item = {'_id': ObjectId(id)}
        data = {'company': company, 
                'marked': marked, 
                'number': number} 

        m.update('tables', item, data)
        response = {'_id': id, 
                    'company': company, 
                    'marked': marked, 
                    'number': number} 
        response = json.dumps(response, default=str)
        response = jsonify(response)
    else:
        response = Response(response="Bad Request",
                    status=404,
                    mimetype='application/json')
    return response

@navigator_api.route('/table/new', methods=['POST'])
def new_table():
    req_json = request.json
    number = req_json['number']
    company = req_json['company']
    marked = req_json['marked']

    if number and company and marked and request.method == 'POST':
        data = {'company': company, 
                'marked': marked, 
                'number': number}
        
        raw = m.write('tables', data)
        id = raw.inserted_id
        response = {'_id': id, 
                    'company': company, 
                    'marked': marked, 
                    'number': number} 
        response = json.dumps(response, default=str)
        response = jsonify(response)
    else: 
        response = Response(response="Bad Request",
                    status=404,
                    mimetype='application/json')
    return response

@navigator_api.route('/table/delete/<id>', methods=['DELETE'])
def delete_table(id):
    item = {'_id': ObjectId(id)}

    if item and request.method == 'DELETE':
        raw = m.delete('tables', item)
        response = raw.raw_result
        response = json.dumps(response, default=str)
        response = jsonify(response)
    else:
        response = Response(response="Bad Request",
                    status=404,
                    mimetype='application/json')
    return response

# Admin login and logout
@navigator_api.route('/login', methods=['POST'])
def admin_login():
    username = request.values['username']
    password = request.values['password']

    if username and password and request.method == 'POST':
        # we can replace this if later. Eventually it'll be validated in the admin class
        if validate(username, password):
            key = encode(password)
            id = {'_id': 1}
            data = {'key': key}
            raw = m.update('admin', id, data)
            response = {'_id': 1, 'key': key}
            response = json.dumps(response, default=str)
            response = jsonify(response)
        else:
            response = Response(response="Refused Credentials",
                        status=401,
                        mimetype='application/json')
    else:
        response = Response(response="Bad Request",
                    status=404,
                    mimetype='application/json')
    return response

@navigator_api.route('/logout', methods=['DELETE'])
def admin_logout():

    #key = request.values['key']
    # if key is valid (check in database)

    m.delete('admin', {'_id': 1})
    return "Success"

