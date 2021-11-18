from abc import ABC, abstractmethod
from models import *
# might not be the right libraries
import pymongo

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