from  app.models import *

class User:
    def __init__(self, uid):
        self.uid = uid
        self.route = Route.__init__(self)
        self.favorites = UserFavorites.__init__(self)

    def downloadDocument(link):
        return

    def signUpForEmailList(email):
        return

    def submitFeedback(feedback):
        return

    def unsubscribeFromEmailList(email):
        return

class Admin(User):
    def __init__(self, uid, position):
        super().__init__(self, uid)
        self.position = position

    def adminLogin():
        return
    
    def validateCredentials(self, name, pwd):
        return

    def uploadDocument(self, link):
        return

class UserFavorites:
    def __init__(self):
        self.favorites = list()

    def addFavorite(tableId):
        return

    def removeFavorite(tableId):
        return

    def getFavorites():
        return

class UserFeedback:
    def __init__(self):
        self.feedback = list()

    def submitFeedback(string):
        return

class Route:
    def __init__(self):
        self.tablesInRoute = self.generateRoute()

    def generateRoute():
        return list()
    
    def addTableToRoute(self, table):
        return