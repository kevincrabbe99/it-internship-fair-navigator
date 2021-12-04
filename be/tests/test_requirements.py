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
    res = requests.put('https://api.itfnavigator.com/api/navigator/subscribe', json=email_json)

    assert res.text == "Thanks for signing up!", "Test Failed"

def test_signup_invalid_email():
    email_json = {'email': 'asdf'}
    res = requests.put('https://api.itfnavigator.com/api/navigator/subscribe', json=email_json)

    assert res.text == "Invalid email", "Test Failed"

# Requirement 21
# Unsubscribe from Email List
def test_unsubscribe_valid_email():
    email_json = {'email': 'test_email@gmail.com'}
    res = requests.delete('https://api.itfnavigator.com/api/navigator/unsubscribe', json=email_json)

    assert res.text == "Unsubscribed!", "Test Failed"

def test_unsubscribe_valid_email_not_found():
    email_json = {'email': 'not_in_the_database@gmail.com'}
    res = requests.delete('https://api.itfnavigator.com/api/navigator/unsubscribe', json=email_json)

    assert res.text == "Email not found", "Test Failed"

def test_unsubscribe_invalid_email():
    email_json = {'email': 'thisisnotarealemailaddress'}
    res = requests.delete('https://api.itfnavigator.com/api/navigator/unsubscribe', json=email_json)

    assert res.text == "Invalid email", "Test Failed"

# Requirement 3
# Admin Login
def test_login_good_creds():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res_json = res.json()
    assert '_id' in res_json, "Test Failed"
    res = requests.delete('https://api.itfnavigator.com/api/navigator/logout', json={'sessionUUID': res_json['uuid']})

def test_login_bad_creds():
    data = {'username': 'wrong_user', 'password': 'wrong_pass'}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res.status_code
    assert  res.status_code == 401, "Test Failed"

# Requirement 25
# Admin Logout
def test_logout():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res_json = res.json()
    res = requests.delete('https://api.itfnavigator.com/api/navigator/logout', json={'sessionUUID': res_json['uuid']})
    assert  res.status_code == 200, "Test Failed"

# Requirement 18
# Remove Table
def test_remove_table_correct_credentials_existing_table():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res_json = res.json()
    uuid = res_json['uuid']

    header = {'Authorization': uuid}

    table_to_add = {'x_coord': 0, 'y_coord': 0, 'company': {'name': 'Test Company', 
                                                            'number_of_reps': '0', 
                                                            'website': 'test.org', 
                                                            'other_info': 'none'}
                                                            ,'year': '2021'}
    res = requests.put('https://api.itfnavigator.com/api/navigator/table', json=table_to_add, headers=header)

    table_to_delete = res.json()['tables'][-1]['_id']
    print(table_to_delete)
    res = requests.delete('https://api.itfnavigator.com/api/navigator/table', json={'_id': table_to_delete, 'year': '2021'}, headers=header)

    requests.delete('https://api.itfnavigator.com/api/navigator/logout', json={'sessionUUID': uuid})

    assert res.status_code == 200, "Test Failed"

def test_remove_table_correct_credentials_nonexisting_table():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res_json = res.json()
    uuid = res_json['uuid']

    header = {'Authorization': uuid}

    table_to_delete = "nonexisting_table_id"
    res = requests.delete('https://api.itfnavigator.com/api/navigator/table', json={'_id': table_to_delete, 'year': '2021'}, headers=header)

    requests.delete('https://api.itfnavigator.com/api/navigator/logout', json={'sessionUUID': uuid})

    assert res.status_code == 400, "Test Failed"

def test_remove_table_no_credentials():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    table_to_delete = "nonexisting_table_id"
    res = requests.delete('https://api.itfnavigator.com/api/navigator/table', json={'_id': table_to_delete, 'year': '2021'})
    
    assert res.status_code == 401, "Test Failed"


# Requirement 17
# Add Table
def test_add_table_full_input_existing_table():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res_json = res.json()
    uuid = res_json['uuid']

    header = {'Authorization': uuid}
    
    table_to_add = {
        'x_coord': 0, 'y_coord': 0, 'company': {'name': 'Test Company', 'number_of_reps': 2, 'website': 'test.com', 'other_info': 'none'}, 'year': '2021','imageUrl': 'image.com'
    }

    res = requests.put('https://api.itfnavigator.com/api/navigator/table', json=table_to_add, headers=header)

    requests.delete('https://api.itfnavigator.com/api/navigator/logout', json={'sessionUUID': uuid})

    assert res.status_code == 200, "Test Failed"


def test_add_table_partial_input_nonexisting_table():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res_json = res.json()
    uuid = res_json['uuid']

    header = {'Authorization': uuid}
    
    table_to_add = {
        'x_coord': 0, 'y_coord': 0, 'company': {'name': None, 'number_of_reps': None, 'website': None, 'other_info': None}, 'year': None,'imageUrl': None
    }

    res = requests.put('https://api.itfnavigator.com/api/navigator/table', json=table_to_add, headers=header)

    requests.delete('https://api.itfnavigator.com/api/navigator/logout', json={'sessionUUID': uuid})

    assert res.status_code == 400, "Test Failed"

def test_add_table_no_input_nonexisting_table():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res_json = res.json()
    uuid = res_json['uuid']

    header = {'Authorization': uuid}
    
    table_to_add = {
        'x_coord': None, 'y_coord': None, 'company': {'name': None, 'number_of_reps': None, 'website': None, 'other_info': None}, 'year': None,'imageUrl': None
    }

    res = requests.put('https://api.itfnavigator.com/api/navigator/table', json=table_to_add, headers=header)

    requests.delete('https://api.itfnavigator.com/api/navigator/logout', json={'sessionUUID': uuid})

    assert res.status_code == 400, "Test Failed"


# Requirement 6
# Change Table Data
def test_change_table_data_full_input_table_changed():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res_json = res.json()
    uuid = res_json['uuid']

    header = {'Authorization': uuid}
    
    table_to_add = {
        'x_coord': 0, 'y_coord': 0, 'company': {'name': 'Test Company', 'number_of_reps': 2, 'website': 'test.com', 'other_info': 'none'}, 'year': '2021','imageUrl': 'image.com'
    }

    res = requests.put('https://api.itfnavigator.com/api/navigator/table', json=table_to_add, headers=header)

    table_to_change_id = res.json()['tables'][-1]['_id']
    print(table_to_change_id)

    table_to_change = {
        '_id': table_to_change_id, 'x_coord': 1, 'y_coord': 1, 'company': {'name': 'Test Company 2', 'number_of_reps': 3, 'website': 'test2.com', 'other_info': 'none'}, 'year': '2021','imageUrl': 'anotherImage.com'
    }

    res = requests.post('https://api.itfnavigator.com/api/navigator/table', json=table_to_change, headers=header)

    requests.delete('https://api.itfnavigator.com/api/navigator/logout', json={'sessionUUID': uuid})

    assert res.status_code == 200, "Test Failed"

def test_change_table_data_partial_input_table_not_changed():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res_json = res.json()
    uuid = res_json['uuid']

    header = {'Authorization': uuid}
    
    table_to_add = {
        'x_coord': 0, 'y_coord': 0, 'company': {'name': 'Test Company', 'number_of_reps': 2, 'website': 'test.com', 'other_info': 'none'}, 'year': '2021','imageUrl': 'image.com'
    }

    res = requests.put('https://api.itfnavigator.com/api/navigator/table', json=table_to_add, headers=header)

    table_to_change_id = res.json()['tables'][-1]['_id']
    print(table_to_change_id)

    table_to_change = {
        '_id': table_to_change_id, 'x_coord': 1, 'y_coord': 1, 'company': {'name': None, 'number_of_reps': None, 'website': None, 'other_info': None}, 'year': None,'imageUrl': None
    }

    res = requests.post('https://api.itfnavigator.com/api/navigator/table', json=table_to_change, headers=header)

    requests.delete('https://api.itfnavigator.com/api/navigator/logout', json={'sessionUUID': uuid})

    assert res.status_code == 400, "Test Failed"

def test_change_table_data_no_input_table_not_changed():
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    data = {'username': navuser, 'password': navpwd}

    res = requests.post('https://api.itfnavigator.com/api/navigator/login', json=data)
    res_json = res.json()
    uuid = res_json['uuid']

    header = {'Authorization': uuid}
    
    table_to_add = {
        'x_coord': 0, 'y_coord': 0, 'company': {'name': 'Test Company', 'number_of_reps': 2, 'website': 'test.com', 'other_info': 'none'}, 'year': '2021','imageUrl': 'image.com'
    }

    res = requests.put('https://api.itfnavigator.com/api/navigator/table', json=table_to_add, headers=header)

    table_to_change_id = res.json()['tables'][-1]['_id']
    print(table_to_change_id)

    table_to_change = {
        '_id': table_to_change_id, 'x_coord': None, 'y_coord': None, 'company': {'name': None, 'number_of_reps': None, 'website': None, 'other_info': None}, 'year': None,'imageUrl': None
    }

    res = requests.post('https://api.itfnavigator.com/api/navigator/table', json=table_to_change, headers=header)

    requests.delete('https://api.itfnavigator.com/api/navigator/logout', json={'sessionUUID': uuid})

    assert res.status_code == 400, "Test Failed"