import re
import hashlib
import base64
import time
import os
from dotenv import load_dotenv

# Regex to validate an email address
regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

def check_email(email):
    """
    Helper method to validate an email address

    Parameters:
    regex (str): The regex to compare
    email (str): The email address to check

    Returns:
    bool: True if valid, false if not
    """
    if (re.fullmatch(regex, email)):
        return True
    else:
        return False

def encode(password):
    body = password + str(time.time())
    key = base64.b64encode(hashlib.sha256(body.encode('utf-8')).digest())
    return str(key.decode('utf-8'))

def validate(username, password):
    load_dotenv()
    navuser = os.getenv('NAVUSER')
    navpwd = os.getenv('NAVPWD')
    if username == navuser and password == navpwd:
        return True
    else:
        return False