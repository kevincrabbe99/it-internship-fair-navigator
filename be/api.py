from flask import Flask, Blueprint, json, request, jsonify, Response
from flask_cors import CORS, cross_origin
from app.mongo_connection import *
from app.user import *
from app.handlers import *
from bson.objectid import ObjectId


navigator_api = Blueprint(
    'navigator_api', __name__, url_prefix='/api/navigator')

m = MongoConnection()
bad_request = Response(response="400 Bad Request",
                    status=400,
                    mimetype='application/json')
refuse_credentials = Response(response="401 Refused Credentials",
                        status=401,
                        mimetype='application/json')


# ENDPOINTS FOR YEAR/MAP

@navigator_api.route('/map', methods=['PUT'])
# @cross_origin()
@cross_origin(origin='*', headers=['Content-Type'])
def get_year():
    if request.method != 'PUT':
        return bad_request
    else:
        req_json = request.get_json()
        print("req_json: ", request.get_data())
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
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def add_year():
    if request.method != "PUT":
        return bad_request
    else:
        req_json = request.get_json()
        if 'Authorization' not in request.headers:
            return refuse_credentials
        if check_token(request.headers['Authorization']):
            if 'year' not in req_json:
                return bad_request
            
            mh = MapHandler(m)
            year = req_json['year']
            if mh.readMapByYear(year) is not None:
                return "Map already exists for this year"
            
            new_map = Map(0, year, "false", [])
            mh.createMap(new_map)
            years = jsonify(mh.getAllYears())

            mh.closeConnection()
            return years
        else:
            return refuse_credentials

@navigator_api.route('/years', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_years():
    if request.method != "GET":
        return bad_request
    else:
        mh = MapHandler(m)
        years = jsonify(mh.getAllYears())
        mh.closeConnection()
    return years

# Require AUTH
@navigator_api.route('/year/archive', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def archive_map():
    if request.method != "POST":
        return bad_request
    else:
        req_json = request.get_json()
        if 'Authorization' not in request.headers:
            return refuse_credentials
        if check_token(request.headers['Authorization']):
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
        else:
            return refuse_credentials

# ENDPOINTS FOR TABLE

@navigator_api.route('/tables', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_all_tables():
    if request.method != 'GET':
        return bad_request
    else: 
        # TODO: embed company instead of only company id
        ch = TableHandler(m)
        response = ch.readAllTables()
        ch.closeConnection()
        response = json.dumps(response, default=str)
        if response is None:
            response = bad_request
    return response


# REQUIRES AUTH
@navigator_api.route('/table', methods=['PUT'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def add_table():
    if request.method != "PUT":
        return bad_request
    else:
        req_json = request.get_json()
        print("REQUEST JSON: ", req_json)
        if 'Authorization' not in request.headers:
            return refuse_credentials
        if check_token(request.headers['Authorization']):
            if 'x_coord' and 'y_coord' and 'company' and 'year' and 'imageUrl' not in req_json:
                return bad_request

            x_coord = req_json['x_coord']
            y_coord = req_json['y_coord']
            company = req_json['company']
            year = req_json['year']
            imageUrl = req_json['imageUrl']

            company_name = company['name']

            if x_coord is None or y_coord is None or 'company' is None or company['name'] is None or company['number_of_reps'] is None or company['website'] is None or company['other_info'] is None or year is None or imageUrl is None:
                return bad_request

            mh = MapHandler(m)
            th = TableHandler(m)
            ch = CompanyHandler(m)

            # check if the company exists
            if ch.readCompanyByName(company_name):
                existing_company = ch.readCompanyByName(company_name)
                company_id = existing_company['_id']
                table_data = {'_id': company_id,
                            'x_coord': x_coord,
                            'y_coord': y_coord,
                            'imageUrl': imageUrl,
                            'company': company_id}
                table_data = json.dumps(table_data, default=str)
                new_table = th.buildTableFromJSON(table_data)
            else:
                company['_id'] = "n/a"
                new_company = ch.buildCompanyFromJSON(json.dumps(company, default=str))
                company_id = ch.createCompany(new_company)
                table_data = {'_id': company_id,
                            'x_coord': x_coord,
                            'y_coord': y_coord,
                            'imageUrl': imageUrl,
                            'company': company_id}
                table_data = json.dumps(table_data, default=str)
                new_table = th.buildTableFromJSON(table_data)

            new_table_id = th.createTable(new_table)

            current_map = mh.readMapByYear(year)
            map_json = json.dumps(current_map, default=str)

            new_map = MapHandler.buildMapFromJSON(map_json)
            mh.addTable(new_map, new_table_id)

            item = new_map.data['id']
            mh.updateMap(item, new_map)

            map_json = mh.jsonifyAllMapData(new_map)

            mh.closeConnection()
            th.closeConnection()
            ch.closeConnection()
            return map_json
        else:
            return refuse_credentials

# REQUIRES AUTH
@navigator_api.route('/table', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def update_table():
    if request.method != "POST":
        return bad_request
    else:
        req_json = request.get_json()
        print(req_json)
        if 'Authorization' not in request.headers:
            return refuse_credentials
        if check_token(request.headers['Authorization']):
            if 'x_coord' not in req_json and 'y_coord' not in req_json and 'company' not in req_json and 'year' not in req_json and 'imageUrl' not in req_json:
                return bad_request
            
            x_coord = req_json['x_coord']
            y_coord = req_json['y_coord']
            company = req_json['company']
            year = req_json['year']
            imageUrl = req_json['imageUrl']

            if x_coord is None or y_coord is None or company is None or company['name'] is None or company['number_of_reps'] is None or company['website'] is None or company['other_info'] is None or year is None or imageUrl is None:
                return bad_request

            company_name = company['name']

            mh = MapHandler(m)
            th = TableHandler(m)
            ch = CompanyHandler(m)

            if '_id' in req_json and th.readTableByID(req_json['_id']):
                # check if the company exists
                table_id = req_json['_id']
                if ch.readCompanyByName(company_name):
                    existing_company = ch.readCompanyByName(company_name)
                    company_id = existing_company['_id']
                    table_data = {'_id': table_id,
                                'x_coord': x_coord,
                                'y_coord': y_coord,
                                'imageUrl': imageUrl,
                                'company': company_id}
                    table_data = json.dumps(table_data, default=str)
                    new_table = th.buildTableFromJSON(table_data)
                else:
                    company['_id'] = "n/a"
                    new_company = ch.buildCompanyFromJSON(json.dumps(company, default=str))
                    company_id = ch.createCompany(new_company)
                    table_data = {'_id': table_id,
                                'x_coord': x_coord,
                                'y_coord': y_coord,
                                'imageUrl': imageUrl,
                                'company': company_id}
                    table_data = json.dumps(table_data, default=str)
                    new_table = th.buildTableFromJSON(table_data)

                th.updateTable(table_id, new_table)

                current_map = mh.readMapByYear(year)
                map_json = json.dumps(current_map, default=str)

                the_map = MapHandler.buildMapFromJSON(map_json)

                map_json = mh.jsonifyAllMapData(the_map)

                mh.closeConnection()
                th.closeConnection()
                ch.closeConnection()
                return map_json
            else:
                x_coord = req_json['x_coord']
                y_coord = req_json['y_coord']
                company = req_json['company']
                year = req_json['year']
                imageUrl = req_json['imageUrl']

                company_name = company['name']

                mh = MapHandler(m)
                th = TableHandler(m)
                ch = CompanyHandler(m)

                # check if the company exists
                if ch.readCompanyByName(company_name):
                    existing_company = ch.readCompanyByName(company_name)
                    company_id = existing_company['_id']
                    table_data = {'_id': company_id,
                                'x_coord': x_coord,
                                'y_coord': y_coord,
                                'imageUrl': imageUrl,
                                'company': company_id}
                    table_data = json.dumps(table_data, default=str)
                    new_table = th.buildTableFromJSON(table_data)
                else:
                    company['_id'] = "n/a"
                    new_company = ch.buildCompanyFromJSON(json.dumps(company, default=str))
                    company_id = ch.createCompany(new_company)
                    table_data = {'_id': company_id,
                                'x_coord': x_coord,
                                'y_coord': y_coord,
                                'imageUrl': imageUrl,
                                'company': company_id}
                    table_data = json.dumps(table_data, default=str)
                    new_table = th.buildTableFromJSON(table_data)

                new_table_id = th.createTable(new_table)

                current_map = mh.readMapByYear(year)
                map_json = json.dumps(current_map, default=str)

                new_map = MapHandler.buildMapFromJSON(map_json)
                mh.addTable(new_map, new_table_id)

                item = new_map.data['id']
                mh.updateMap(item, new_map)

                map_json = mh.jsonifyAllMapData(new_map)

                mh.closeConnection()
                th.closeConnection()
                ch.closeConnection()
                return map_json
        else:
            return refuse_credentials

# REQUIRES AUTH
@navigator_api.route('/delete_table', methods=['PUT'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def delete_table():
    if request.method != "PUT":
        return bad_request
    else:
        req_json = request.json
        try:
            print(request.headers)
        except:
            print("no header received")
        if not request.headers:
            return refuse_credentials
        if 'Authorization' not in request.headers:
            return refuse_credentials
        if check_token(request.headers['Authorization']):
            if '_id' not in req_json and 'year' not in req_json:
                return bad_request
            if req_json['_id'] is None or req_json['year'] is None:
                return bad_request

            id = req_json['_id']
            year = req_json['year']

            mh = MapHandler(m)
            th = TableHandler(m)

            temp_map = mh.readMapByYear(year)
            map_json = json.dumps(temp_map, default=str)

            the_map = MapHandler.buildMapFromJSON(map_json)
            try:
                MapHandler.removeTable(the_map, id)
            except:
                return bad_request
            
            try:
                mh.updateMap(temp_map['_id'], the_map)
            except:
                return bad_request

            try:
                th.deleteTable(id)
            except:
                return bad_request
            
            data_json = mh.jsonifyAllMapData(the_map)
            return data_json
        else:
            return refuse_credentials


# ENDPOINTS FOR EMAIL LIST

@navigator_api.route('/subscribe', methods=['PUT'])
@cross_origin()
def subscribe():
    if request.method != 'PUT':
        return bad_request
    else:
        req_json = request.get_json()
        if 'email' not in req_json:
            return bad_request
        if 'email' is None:
            return bad_request
        
        email = req_json['email']
        if check_email(email):
            eh = EmailListHandler(m)
            response = eh.createEmail(email)
            eh.closeConnection()
            if response is not None:
                response = json.dumps(response)
                return "Thanks for signing up!"
        else:
            return "Invalid email"
    return bad_request

@navigator_api.route('/unsubscribe', methods=['DELETE'])
@cross_origin(origin='*', headers=['Content-Type'])
def unsubscribe():
    if request.method != 'DELETE':
        return bad_request
    else:
        try:
            req_json = request.get_json()
        except:
            return bad_request
        try:
            if 'email' not in req_json:
                return bad_request
            if 'email' is None:
                return bad_request
        except:
            return bad_request
        
        email = req_json['email']
        if check_email(email):
            eh = EmailListHandler(m)
            try:
                email_data = eh.readEmail(email)
                id = email_data['_id']
            except:
                return "Email not found"
        else:
            return "Invalid email"
        
        response = eh.deleteEmail(str(id))
        eh.closeConnection()
        if response is not None:
            response = json.dumps(response)
            return "Unsubscribed!"

    return bad_request

# REQUIRES AUTH
@navigator_api.route('/emaillist', methods=['GET'])
@cross_origin()
def get_emaillist():
    if request.method != "GET":
        return bad_request
    else:
        if 'Authorization' not in request.headers:
            return refuse_credentials
        if check_token(request.headers['Authorization']):
            eh = EmailListHandler(m)
            response = eh.readEmailList()
            response = json.dumps(response, default=str)
            return jsonify(response)
        else:
            return refuse_credentials
# ENDPOINTS FOR FEEDBACK

@navigator_api.route('/feedback', methods=['PUT'])
@cross_origin()
def submit_feedback():
    if request.method != 'PUT':
        return bad_request
    else:
        req_json = request.json
        if 'message' not in req_json:
            return bad_request
        if 'message' is None:
            return bad_request
        feedback = req_json['message']
        email = req_json['email']
        fh = FeedbackHandler(m)
        response = fh.submit_feedback(email, feedback)
        fh.closeConnection()
        response = json.dumps(response, default=str)
        if response is None:
            return bad_request
    return "Thanks for the feedback! :)"

# REQUIRES AUTH
@navigator_api.route('/feedback', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_feedback():
    if request.method != 'GET':
        return bad_request
    else:
        if 'Authorization' not in request.headers:
            return refuse_credentials
        if check_token(request.headers['Authorization']):
            fh = FeedbackHandler(m)
            response = fh.get_feedback()
            fh.closeConnection()
            response = json.dumps(response, default=str)
            if response is None:
                return bad_request
        else:
            return refuse_credentials
    return jsonify(response)

# ENDPOINTS FOR COMPANIES

@navigator_api.route('/companies', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_all_companies():
    if request.method != 'GET':
        return bad_request
    else:
        ch = CompanyHandler(m)
        response = ch.readAllCompanies()
        ch.closeConnection()
        response = json.dumps(response, default=str)
        if response is None:
            response = bad_request
    return response

@navigator_api.route('/company', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_company():
    if request.method != 'GET':
        return bad_request
    else:
        req_json = request.get_json()
        if 'name' not in req_json:
            return bad_request
        if 'name' is None:
            return bad_request
        name = req_json['name']
        ch = CompanyHandler(m)
        company_data = ch.readCompanyByName(name)
        if company_data is None:
            return bad_request
        company_data = json.dumps(company_data, default=str)
        response = jsonify(company_data)
        
    return response


# ENDPOINTS FOR ADMIN LOGIN/LOGOUT

@navigator_api.route('/login', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
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
    uuid = request.get_json()['sessionUUID']
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

@navigator_api.route('/validtoken', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def valid_token():
    req_json = request.get_json()
    if request.method != 'GET':
        return bad_request
    elif 'uuid' in req_json:
        uuid = req_json['uuid']
        if check_token(uuid):
            return {'valid': 'true'}
        else:
            return {'valid': 'false'}
    else:
        return bad_request
    
def check_token(uuid: str):
    ah = AdminHandler(m)
    id = ah.getUUID_ObjectID(uuid)
    if id is None:
        return False
    else:
        return True
