from api import *
from dotenv import load_dotenv
import requests
import os
import pytest

# RUN TESTS USING: python -m pytest -rx

# Requirement 20
# Signup for Email List
def test_signup_valid_email():
    email_json = {'email': 'test_email@gmail.com'}
    res = requests.put('http://localhost:8080/api/navigator/subscribe', json=email_json)

    assert res.text == "Thanks for signing up!", "Test Failed"

def test_signup_invalid_email():
    email_json = {'email': 'asdf'}
    res = requests.put('http://localhost:8080/api/navigator/subscribe', json=email_json)

    assert res.text == "Invalid email", "Test Failed"

# Requirement 21
# Unsubscribe from Email List
def test_unsubscribe_valid_email():
    email_json = {'email': 'test_email@gmail.com'}
    res = requests.delete('http://localhost:8080/api/navigator/unsubscribe', json=email_json)

    assert res.text == "Unsubscribed!", "Test Failed"

def test_unsubscribe_valid_email_not_found():
    email_json = {'email': 'not_in_the_database@gmail.com'}
    res = requests.delete('http://localhost:8080/api/navigator/unsubscribe', json=email_json)

    assert res.text == "Email not found", "Test Failed"

def test_unsubscribe_invalid_email():
    email_json = {'email': 'thisisnotarealemailaddress'}
    res = requests.delete('http://localhost:8080/api/navigator/unsubscribe', json=email_json)

    assert res.text == "Invalid email", "Test Failed"

# Requirement 3
# Admin Login
def test_login_good_creds():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('http://localhost:8080/api/navigator/login', json=data)
    res_json = res.json()
    assert '_id' in res_json, "Test Failed"
    res = requests.delete('http://localhost:8080/api/navigator/logout', json={'sessionUUID': res_json['uuid']})

def test_login_bad_creds():
    data = {'username': 'wrong_user', 'password': 'wrong_pass'}

    res = requests.post('http://localhost:8080/api/navigator/login', json=data)
    res.status_code
    assert  res.status_code == 401, "Test Failed"

# Requirement 25
# Admin Logout
def test_logout():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('http://localhost:8080/api/navigator/login', json=data)
    res_json = res.json()
    res = requests.delete('http://localhost:8080/api/navigator/logout', json={'sessionUUID': res_json['uuid']})
    assert  res.status_code == 200, "Test Failed"

# Requirement 18
# Remove Table
def test_remove_table_correct_credentials_existing_table():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('http://localhost:8080/api/navigator/login', json=data)
    res_json = res.json()
    uuid = res_json['uuid']

    header = {'Authorization': uuid}

    table_to_add = {'x_coord': 0, 'y_coord': 0, 'company': {'name': 'Test Company', 
                                                            'number_of_reps': '0', 
                                                            'website': 'test.org', 
                                                            'other_info': 'none'}
                                                            ,'year': '2021'}
    res = requests.put('http://localhost:8080/api/navigator/table', json=table_to_add, headers=header)

    table_to_delete = res.json()['tables'][-1]['_id']
    print(table_to_delete)
    res = requests.delete('http://localhost:8080/api/navigator/table', json={'_id': table_to_delete, 'year': '2021'}, headers=header)

    requests.delete('http://localhost:8080/api/navigator/logout', json={'sessionUUID': uuid})

    assert res.status_code == 200, "Test Failed"

def test_remove_table_correct_credentials_nonexisting_table():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('http://localhost:8080/api/navigator/login', json=data)
    res_json = res.json()
    uuid = res_json['uuid']

    header = {'Authorization': uuid}

    table_to_delete = "nonexisting_table_id"
    res = requests.delete('http://localhost:8080/api/navigator/table', json={'_id': table_to_delete, 'year': '2021'}, headers=header)

    requests.delete('http://localhost:8080/api/navigator/logout', json={'sessionUUID': uuid})

    assert res.status_code == 400, "Test Failed"

def test_remove_table_no_credentials():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    table_to_delete = "nonexisting_table_id"
    res = requests.delete('http://localhost:8080/api/navigator/table', json={'_id': table_to_delete, 'year': '2021'})
    
    assert res.status_code == 401, "Test Failed"