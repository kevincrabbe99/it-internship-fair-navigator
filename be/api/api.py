from flask import Flask, Blueprint, json, request, jsonify

navigator_api = Blueprint(
    'navigator_api', __name__, url_prefix='/api/navigator')

@navigator_api.route('/tables', methods=['GET'])
def api_demonstration():
    response = {
        'name': 'ISU',
        'website': 'ilstu.edu',
        'position': 1
    }
    return jsonify(response)

