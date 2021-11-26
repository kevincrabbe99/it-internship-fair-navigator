import re

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