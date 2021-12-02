from flask import Flask, Blueprint, json, request, jsonify, Response
from flask_cors import CORS, cross_origin
from app.mongo_connection import *
from app.user import *
from app.handlers import *
from bson.objectid import ObjectId


navigator_api = Blueprint(
    'navigator_api', __name__, url_prefix='/api/navigator')

m = MongoConnection()
bad_request = Response(response="404 Bad Request",
                    status=404,
                    mimetype='application/json')
refuse_credentials = Response(response="401 Refused Credentials",
                        status=401,
                        mimetype='application/json')


# ENDPOINTS FOR YEAR/MAP

@navigator_api.route('/year', methods=['GET'])
def get_year():
    if request.method != 'GET':
        return bad_request
    else:
        req_json = request.get_json()
        if 'year' not in req_json:
            return bad_request
        year = req_json['year']
        mh = MapHandler(m)
        map_data = mh.readMapByYear(year)
        if map_data is None:
            return bad_request

        new_map = mh.buildMapFromJSON(json.dumps(map_data, default=str))
        if new_map is None:
            return bad_request

        map_json = mh.jsonifyAllMapData(new_map)
        if map_json is None:
            return bad_request

        mh.closeConnection()
    return map_json

# REQUIRES AUTH
@navigator_api.route('/year', methods=['PUT'])
def add_year():
    if request.method != "PUT":
        return bad_request
    else:
        req_json = request.get_json()
        if 'Authorization' not in request.headers:
            return refuse_credentials
        if 'year' not in req_json:
            return bad_request
        
        mh = MapHandler(m)
        year = req_json['year']
        if mh.readMapByYear(year) is not None:
            return "Map already exists for this year"
        
        new_map = Map(0, year, "false", "none")
        mh.createMap(new_map)
        years = jsonify(mh.getAllYears())

        mh.closeConnection()
    return years

@navigator_api.route('/year/archive', methods=['POST'])
def archive_map():
    if request.method != "POST":
        return bad_request
    else:
        req_json = request.get_json()
        if 'Authorization' not in request.headers:
            return refuse_credentials
        if 'year' not in req_json:
            return bad_request
        if 'archive' not in req_json:
            return bad_request
        
        mh = MapHandler(m)
        year = req_json['year']
        archive = req_json['archive']

        if archive != "true" and archive != "false":
            return bad_request

        if mh.readMapByYear(year) is None:
            return bad_request

        map_json = mh.readMapByYear(year)
        map_json = json.dumps(map_json, default=str)

        new_map = MapHandler.buildMapFromJSON(map_json)
        new_map.archived = archive

        item = new_map.data['id']
        mh.updateMap(item, new_map)

        map_json = mh.jsonifyAllMapData(new_map)
    return map_json

# ENDPOINTS FOR TABLE

# REQUIRES AUTH
@navigator_api.route('/table', methods=['PUT'])
def add_table():
    if request.method != "PUT":
        return bad_request
    else:
        req_json = request.get_json()
        if 'Authorization' not in request.headers:
            return refuse_credentials
        
    return

# REQUIRES AUTH
@navigator_api.route('/table', methods=['POST'])
def update_table():
    return

# REQUIRES AUTH
@navigator_api.route('/table', methods=['DELETE'])
def delete_table():
    return


# ENDPOINTS FOR EMAIL LIST

@navigator_api.route('/subscribe', methods=['PUT'])
def subscribe():
    return

@navigator_api.route('/unsubscribe', methods=['DELETE'])
def unsubscribe():
    return

@navigator_api.route('/emaillist', methods=['GET'])
def get_emaillist():
    return


# ENDPOINTS FOR ADMIN LOGIN/LOGOUT

@navigator_api.route('/login', methods=['POST'])
@cross_origin()
def admin_login():

    username = request.get_json()['username']
    password = request.get_json()['password']

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
    return jsonify(response)

@navigator_api.route('/logout', methods=['DELETE'])
@cross_origin()
def admin_logout():
    uuid = request.get_json()['uuid']
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



# CRUD FOR TABLES
# ALL THESE WILL REQUIRE AN AUTH HEADER, NOT SURE HOW TO IMPLEMENT THAT YET NEEDS SOME RESEARCH
# @navigator_api.route('/tables', methods=['GET'])
# @cross_origin()
# def get_tables():
#     if request.method != 'GET':
#         response = bad_request
#     else:
#         th = TableHandler(m)
#         response = th.readAllTables()
#         th.closeConnection()
#         response = json.dumps(response, default=str)
#         if response is None:
#             response = bad_request
#     return jsonify(response)

# @navigator_api.route('/table', methods=['GET'])
# @cross_origin()
# def get_table():
#     if request.method != 'GET':
#         response = bad_request
#     elif request.args.get('_id') is not None:
#         th = TableHandler(m)
#         id = request.args.get('_id')
#         response = th.readTableByID(id)
#         th.closeConnection()
#         response = json.dumps(response, default=str)
#     elif request.args.get('number') is not None:
#         th = TableHandler(m)
#         num = request.args.get('number')
#         response = th.readTableByNumber(num)
#         th.closeConnection()
#         response = json.dumps(response, default=str)
#     else:
#         response = bad_request
    
#     if response is None:
#         response = bad_request

#     return jsonify(response)
    
# @navigator_api.route('/table/update', methods=['PUT'])
# @cross_origin()
# def update_table():
#     req_json = request.json
#     id = req_json['_id']
#     number = req_json['number']
#     company = req_json['company']
#     marked = req_json['marked']

#     if request.method != 'PUT':
#         response = bad_request
#     elif id and number and company and marked:
#         t = Table(number, company, marked)
#         th = TableHandler(m)
#         response = th.updateTable(id, t)
#         th.closeConnection()
#         response = {'updated': response}
#     else:
#         response = bad_request
    
#     if response is None:
#         response = bad_request

#     return jsonify(response)

# @navigator_api.route('/table/new', methods=['POST'])
# @cross_origin()
# def new_table():
#     req_json = request.json
#     number = req_json['number']
#     company = req_json['company']
#     marked = req_json['marked']

#     if request.method != 'POST':
#         response = bad_request
#     elif number and company and marked:
#         t = Table(number, company, marked)
#         th = TableHandler(m)
#         response = th.createTable(t)
#         th.closeConnection()
#         response = {'inserted_id': response}
#     else:
#         response = bad_request
    
#     if response is None:
#         response = bad_request

#     return jsonify(response)

# @navigator_api.route('/table/delete/<id>', methods=['DELETE'])
# @cross_origin()
# def delete_table(id):
#     if request.method != 'DELETE':
#         response = bad_request
#     elif id:
#         th = TableHandler(m)
#         response = th.deleteTable(id)
#         response = {'deleted': response}
#     else:
#         response = bad_request
#     return jsonify(response)