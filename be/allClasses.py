from abc import ABC, abstractmethod
# might not be the right libraries
import pymongo
import flask_pymongo
import pydantic
import fastapi

# Last updated: 11/11/2021
# skeleton classes
# All methods have a return statement for now to get rid of the errors

class DatabaseObject:
    def __init__(self, databaseCon, accessToken, user):
        self.databaseCon = databaseCon
        self.accessToken = accessToken
        self.user = user

    @abstractmethod
    def getConnection():
        pass

    @abstractmethod
    def closeConnection():
        pass

class MongoConnection():
    def __init__(self):
        return

class MapHandler(DatabaseObject):
    def __init__(self, databaseCon, accessToken, user, mapJSON):
        super().__init__(self, databaseCon, accessToken, user)
        self.map = self.buildMapFromJSON(mapJSON)
    
    def addTable(self, table):
        return

    def removeTable(self, table):
        return

    def buildMapFromJSON(mapJSON):
        return
    
    def getConnection():
        return

    def closeConnection():
        return

class Map:
    def __init__(self, mapID, mostRecentYear, availableYears, tables):
        self.mapID = mapID
        self.mostRecentYear = mostRecentYear
        self.availableYears = availableYears
        self.tables = tables

    def addTable(self, table):
        return
    
    def removeTable(self, table):
        return

    def yearExist(self, year):
        return

class TableHandler(DatabaseObject):
    def __init__(self, databaseCon, accessToken, user, tableJSON):
        super().__init__(self, databaseCon, accessToken, user)
        self.map = self.buildTableFromJSON(tableJSON)
    
    def setTableLocation(self, id, number):
        return

    def setTableCompany(self, id, company):
        return

    def buildTableFromJSON(mapJSON):
        return
    
    def getConnection():
        return

    def closeConnection():
        return

class Table:
    def __init__(self, id, number, company, marked):
        self.id = id
        self.number = number
        self.company = company
        self.marked = marked

class CompanyHandler(DatabaseObject):
    def __init__(self, databaseCon, accessToken, user, companyJSON):
        super().__init__(self, databaseCon, accessToken, user)
        self.company = self.buildCompanyFromJSON(companyJSON)
    
    def addCompany(self, company):
        return

    def buildCompanyFromJSON(companyJSON):
        return

    def setCompanyName(self, name):
        return
    
    def getConnection():
        return

    def closeConnection():
        return

class Company:
    def __init__(self, id, name, repCount, website, info):
        self.companyID = id
        self.name = name
        self.numberOfRepresentatives = repCount
        self.companyWebsite = website
        self.otherInfo = info

class Route:
    def __init__(self):
        self.tablesInRoute = self.generateRoute()

    def generateRoute():
        return list()
    
    def addTableToRoute(self, table):
        return

class DocumentHandler(DatabaseObject):
    def __init__(self, databaseCon, accessToken, user, document):
        super().__init__(self, databaseCon, accessToken, user)
        self.document = document
    
    def downloadDocument(self, link):
        return

    def getConnection():
        return

    def closeConnection():
        return

class Document:
    def __init__(self, fileName, link):
        self.fileName = fileName
        self.link = link

    def download(self):
        return

class EmailListHandler(DatabaseObject):
    def __init__(self, databaseCon, accessToken, user):
        super().__init__(self, databaseCon, accessToken, user)
        self.emailList = self.generateEmailList()
    
    def signUpForEmailList(self, email):
        return

    def unsubscribeFromEmailList(self, email):
        return

    def generateEmailList():
        return list()
    
    def getConnection():
        return

    def closeConnection(): 
        return

class EmailList:
    def __init__(self):
        self.emails = list()

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