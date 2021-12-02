from app.models import *
import uuid
import os
import bcrypt
from dotenv import load_dotenv

class User:
    def __init__(self):
        self.session_uuid = str(uuid.uuid4())
        self.expire_time = 30
        # self.uid = uid
        # self.route = Route.__init__(self)
        # self.favorites = UserFavorites.__init__(self)

    def downloadDocument(link):
        return

    def signUpForEmailList(email):
        return

    def submitFeedback(feedback):
        return

    def unsubscribeFromEmailList(email):
        return

class Admin(User):
    def __init__(self):
        super().__init__()
        
    def adminLogin():
        return

    def uploadDocument(self, link):
        return

class AccountManager:

    def __init__(self):
        self.admin = Admin()

    def get_session_details(self):
        return self.admin.expire_time, self.admin.session_uuid

    @staticmethod
    def check_valid(uname: str, pwd: str):
        load_dotenv()
        username = os.getenv('NAVUSER')
        hashed = os.getenv('NAVHASH')

        if (username == uname) and (bcrypt.checkpw(pwd.encode('utf-8'), hashed.encode('utf-8'))):
            return True
        else:
            return False
    


# class UserFavorites:
#     def __init__(self):
#         self.favorites = list()

#     def addFavorite(tableId):
#         return

#     def removeFavorite(tableId):
#         return

#     def getFavorites():
#         return

# class UserFeedback:
#     def __init__(self):
#         self.feedback = list()

#     def submitFeedback(string):
#         return

# class Route:
#     def __init__(self):
#         self.tablesInRoute = self.generateRoute()

#     def generateRoute():
#         return list()
    
#     def addTableToRoute(self, table):
#         return