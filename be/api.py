from flask import Flask, Blueprint, json, request, jsonify, Response
from flask_cors import CORS, cross_origin
from app.mongo_connection import *
from app.user import *
from app.handlers import *
from bson.objectid import ObjectId


navigator_api = Blueprint(
    'navigator_api', __name__, url_prefix='/api/navigator')

m = MongoConnection()
bad_request = Response(response="Bad Request",
                    status=404,
                    mimetype='application/json')
refuse_credentials = Response(response="Refused Credentials",
                        status=401,
                        mimetype='application/json')

# CRUD FOR TABLES
# ALL THESE WILL REQUIRE AN AUTH HEADER, NOT SURE HOW TO IMPLEMENT THAT YET NEEDS SOME RESEARCH
@navigator_api.route('/tables', methods=['GET'])
@cross_origin()
def get_tables():
    if request.method != 'GET':
        response = bad_request
    else:
        th = TableHandler(m)
        response = th.readAllTables()
        th.closeConnection()
        response = json.dumps(response, default=str)
        if response is None:
            response = bad_request
    return jsonify(response)

@navigator_api.route('/table', methods=['GET'])
@cross_origin()
def get_table():
    if request.method != 'GET':
        response = bad_request
    elif request.args.get('_id') is not None:
        th = TableHandler(m)
        id = request.args.get('_id')
        response = th.readTableByID(id)
        th.closeConnection()
        response = json.dumps(response, default=str)
    elif request.args.get('number') is not None:
        th = TableHandler(m)
        num = request.args.get('number')
        response = th.readTableByNumber(num)
        th.closeConnection()
        response = json.dumps(response, default=str)
    else:
        response = bad_request
    
    if response is None:
        response = bad_request

    return jsonify(response)
    
@navigator_api.route('/table/update', methods=['PUT'])
@cross_origin()
def update_table():
    req_json = request.json
    id = req_json['_id']
    number = req_json['number']
    company = req_json['company']
    marked = req_json['marked']

    if request.method != 'PUT':
        response = bad_request
    elif id and number and company and marked:
        t = Table(number, company, marked)
        th = TableHandler(m)
        response = th.updateTable(id, t)
        th.closeConnection()
        response = {'updated': response}
    else:
        response = bad_request
    
    if response is None:
        response = bad_request

    return jsonify(response)

@navigator_api.route('/table/new', methods=['POST'])
@cross_origin()
def new_table():
    req_json = request.json
    number = req_json['number']
    company = req_json['company']
    marked = req_json['marked']

    if request.method != 'POST':
        response = bad_request
    elif number and company and marked:
        t = Table(number, company, marked)
        th = TableHandler(m)
        response = th.createTable(t)
        th.closeConnection()
        response = {'inserted_id': response}
    else:
        response = bad_request
    
    if response is None:
        response = bad_request

    return jsonify(response)

@navigator_api.route('/table/delete/<id>', methods=['DELETE'])
@cross_origin()
def delete_table(id):
    if request.method != 'DELETE':
        response = bad_request
    elif id:
        th = TableHandler(m)
        response = th.deleteTable(id)
        response = {'deleted': response}
    else:
        response = bad_request
    return jsonify(response)

# Admin login and logout
@navigator_api.route('/login', methods=['POST'])
@cross_origin()
def admin_login():
    print("LOGIN REQ VARS: ", request.json)
    print("LOGIN REQ JSON: ", request.json.get('username'))
    username = request.json.get('username')
    password = request.json.get('password')

    if request.method != 'POST':
        response = bad_request

    if username and password:
        ah = AdminHandler(m)
        am = AccountManager()
        if AccountManager.check_valid(username, password):
            expire_time, uuid = am.get_session_details()
            id = ah.insertAdminSessionUUID(uuid)
            ah.closeConnection()
            if id is None:
                response = bad_request
            else:
                response = {'_id': id,
                            'uuid': uuid,
                            'expire_time': expire_time}
        else:
            response = refuse_credentials
    else:
        response = bad_request
    return response

@navigator_api.route('/logout', methods=['DELETE'])
@cross_origin()
def admin_logout():
    uuid = request.values['uuid']
    if request.method != 'DELETE':
        return bad_request
    elif uuid:
        ah = AdminHandler(m)
        id = ah.getUUID_ObjectID(uuid)
        if id is None:
            return refuse_credentials
        response = ah.deleteAdminSessionUUID(str(id))
        ah.closeConnection()
        response = {'logged_out': response}
    else:
        return refuse_credentials
    
    if response is None:
        return bad_request

    return jsonify(response)

