import json

from abc import ABC, ABCMeta, abstractmethod

from ..app.models import *
from ..app.mongo_connection import *
from ..app.util import check_email

# Last updated: 11/11/2021
# skeleton classes
# All methods have a return statement for now to get rid of the errors

class DatabaseObject(metaclass=ABCMeta):
    def __init__(self, databaseCon, accessToken, user):
        self.databaseCon = databaseCon
        self.accessToken = accessToken
        self.user = user

    @abstractmethod
    def getConnection():
        raise NotImplementedError

    @abstractmethod
    def closeConnection():
        raise NotImplementedError

class MapHandler(DatabaseObject):
    """
    A class used to handle CRUD operations between Map model and the DB

    Attributes:
    databaseCon (MongoConnection): The MongoConnection singleton
    accessToken (str): Unsure of usage
    user (User): Unsure of usage
    mapJSON (str): The JSON object containing table data
    """

    def __init__(self, databaseCon, accessToken, user, mapJSON):
        """
        Parameters:
        databaseCon (MongoConnection): The MongoConnection singleton
        accessToken (str): Unsure of usage
        user (User): Unsure of usage
        mapJSON (str): The JSON object containing table data
        """
        super().__init__(databaseCon, accessToken, user)
        self.map = self.buildMapFromJSON(mapJSON)
    
    def addTable(self, table):
        """
        Static method that adds a table to the map

        Parameters:
        table (str): The string containing the ID of the table to add

        Returns:
        Nothing
        """
        self.map.add_table(table)
        return

    def removeTable(self, table):
        """
        Class method that removes a table from the map

        Parameters:
        table (str): The string containing the ID of the table to remove

        Returns:
        Nothing
        """
        self.map.remove_table(table)
        return

    @staticmethod
    def s_addTable(map: Map, table: str):
        """
        Static method that adds a table to any map

        Parameters:
        map (Map): The Map to use
        table (str): The string containing the ID of the table to add

        Returns:
        Nothing
        """
        map.add_table(table)
        return

    @staticmethod
    def s_removeTable(map: Map, table):
        """
        Static method that removes a table from any map

        Parameters:
        map (Map): The Map to use
        table (str): The string containing the ID of the table to remove

        Returns:
        Nothing
        """
        map.remove_table(table)
        return

    def buildMapFromJSON(self, mapJSON):
        """
        Class method that build the map object from a json string

        Parameters:
        mapJSON (str): The JSON object containing map parameters

        Returns:
        Map: The built map object
        """
        data = json.loads(mapJSON)
        most_recent_year = data["most_recent_year"]
        available_years = data["available_years"]
        tables = data["tables"]
        m = Map(most_recent_year, available_years, tables)
        return m
    
    def getConnection(self):
        """
        Method to return the reference to the mongo_connection singleton

        Returns:
        MongoConnection: The reference to the singleton
        """
        return self.databaseCon

    def closeConnection(self):
        return

class TableHandler(DatabaseObject):
    """
    A class used to handle CRUD operations between Table model and the DB

    Attributes:
    databaseCon (MongoConnection): The MongoConnection singleton
    accessToken (str): Unsure of usage
    user (User): Unsure of usage
    tableJSON (str): The JSON object containing table data
    """

    def __init__(self, databaseCon, accessToken, user, tableJSON):
        """
        Parameters:
        databaseCon (MongoConnection): The MongoConnection singleton
        accessToken (str): Unsure of usage
        user (User): Unsure of usage
        tableJSON (str): The JSON object containing table data
        """
        super().__init__(databaseCon, accessToken, user)
        self.table = self.buildTableFromJSON(tableJSON)
    
    def setTableLocation(self, number):
        """
        Class method that sets a table's location in the map

        Parameters:
        number (int): The position of the table in the map

        Returns:
        Nothing
        """
        self.table.number = number
        return

    def setTableCompany(self, company):
        """
        Class method that sets a table's company

        Parameters:
        company (str): The ID of the company to set

        Returns:
        Nothing
        """
        self.table.company = company
        return

    @staticmethod
    def s_setTableLocation(table: Table, number):
        """
        Static method that sets a table's location in the map

        Parameters:
        table (Table): The table to use
        number (int): The position of the table in the map

        Returns:
        Nothing
        """
        table.number = number
        return

    @staticmethod
    def s_setTableCompany(table: Table, company: str):
        """
        Static method that sets a table's company

        Parameters:
        table (Table): The table to use
        company (str): The ID of the company to set

        Returns:
        Nothing
        """
        table.company = company
        return

    def buildTableFromJSON(self, tableJSON):
        """
        Class method that build the table object from a json string

        Parameters:
        tableJSON (str): The JSON object containing table parameters

        Returns:
        Table: The built table object
        """
        data = json.loads(tableJSON)
        number = data["number"]
        company = data["company"]
        marked = data["marked"]
        t = Table(number, company, marked)
        return t
    
    def getConnection(self):
        """
        Method to return the reference to the mongo_connection singleton

        Returns:
        MongoConnection: The reference to the singleton
        """
        return self.databaseCon

    def closeConnection(self):
        return

class CompanyHandler(DatabaseObject):
    """
    A class used to handle CRUD operations between Company model and the DB

    Attributes:
    databaseCon (MongoConnection): The MongoConnection singleton
    accessToken (str): Unsure of usage
    user (User): Unsure of usage
    companyJSON (str): The JSON object containing company data
    """

    def __init__(self, databaseCon, accessToken, user, companyJSON):
        """
        Parameters:
        dataBaseCon (MongoConnection): The MongoConnection singleton
        accesToken (str):
        user (User):
        companyJSON (str): The JSON object containing company data
        """
        super().__init__(databaseCon, accessToken, user)
        self.company = self.buildCompanyFromJSON(companyJSON)
    
    def addCompany(self, company):
        return

    def buildCompanyFromJSON(self, companyJSON):
        """
        Class method that build the company object from a json string

        Parameters:
        companyJSON (str): The JSON object containing company parameters

        Returns:
        Company: The built company object
        """
        data = json.loads(companyJSON)
        name = data["name"]
        number_of_reps = data["number_of_reps"]
        website = data["website"]
        other_info = data["other_info"]
        c = Company(name, number_of_reps, website, other_info)
        return c

    def setCompanyName(self, name):
        """
        Class method that sets the name of the company attribute

        Parameters:
        name (str): The name of the company to change

        Returns:
        Nothing
        """
        self.company.name = name
        return

    @staticmethod
    def s_setCompanyName(company: Company, name):
        """
        Static method that sets the name of company

        Parameters:
        company (Company): The company to use
        name (str): The name of the company to change

        Returns:
        Nothing
        """
        company.name = name
        return
    
    def getConnection(self):
        """
        Method to return the reference to the mongo_connection singleton

        Returns:
        MongoConnection: The reference to the singleton
        """
        return self.databaseCon

    def closeConnection(self):
        return

class DocumentHandler(DatabaseObject):
    """
    A class used to handle CRUD operations between Document model and the DB

    Attributes:
    databaseCon (MongoConnection): The MongoConnection singleton
    accessToken (str): Unsure of usage
    user (User): Unsure of usage
    document (Document): The document to 'handle'
    """

    def __init__(self, databaseCon, accessToken, user, document):
        """
        Parameters:
        dataBaseCon (MongoConnection): The MongoConnection singleton
        accesToken (str):
        user (User):
        document (Document): The document object to 'handle'
        """
        super().__init__(databaseCon, accessToken, user)
        self.document = document
    
    def downloadDocument(self):
        """
        Class method that returns the link of the document attribute

        Returns:
        str: The link to the documents download
        """
        return self.document.link

    @staticmethod
    def s_downloadDocument(document: Document):
        """
        Static method that returns the link of a document

        Parameters:
        document (Document): The document to downloaded

        Returns:
        str: The link to the documents download
        """
        return document.link

    def getConnection(self):
        """
        Method to return the reference to the mongo_connection singleton

        Returns:
        MongoConnection: The reference to the singleton
        """
        return self.databaseCon

    def closeConnection(self):
        return

class EmailListHandler(DatabaseObject):
    """
    A class used to handle CRUD operations between EmailList model and the DB

    Attributes:
    databaseCon (MongoConnection): The MongoConnection singleton
    accessToken (str): Unsure of usage
    user (User): Unsure of usage
    """

    def __init__(self, databaseCon: MongoConnection, accessToken, user, emaillist):
        """
        Parameters:
        dataBaseCon (MongoConnection): The MongoConnection singleton
        accesToken (str):
        user (User):
        """
        super().__init__(databaseCon, accessToken, user)
        self.emailList = emaillist
    
    def signUpForEmailList(self, email):
        """
        Class method that adds an email to the email_list attribute

        Parameters:
        email (string): The string containing the email to add

        Returns:
        Nothing
        """
        if check_email(email):
            self.emailList.subscribe(email)
        return

    def unsubscribeFromEmailList(self, email):
        """
        Class method that removes an email from any emaillist

        Parameters:
        email (string): The string containing the email to remove

        Returns:
        Nothing
        """
        if check_email(email):
            self.emailList.unsubscribe(email)
        return

    @staticmethod
    def s_signUpForEmailList(email_list: EmailList, email):
        """
        Static method that adds an email to any emaillist

        Parameters:
        email_list (EmailList): The email_list object to use
        email (string): The string containing the email to add

        Returns:
        Nothing
        """
        if check_email(email):
            email_list.subscribe(email)
        return

    @staticmethod
    def s_unsubscribeFromEmailList(email_list: EmailList, email):
        """
        Static method that removes an email from any emaillist

        Parameters:
        email_list (EmailList): The email_list object to use
        email (string): The string containing the email to remove

        Returns:
        Nothing
        """
        if check_email(email):
            email_list.unsubscribe(email)
        return

    def generateEmailList():
        return list()
    
    def getConnection(self):
        """
        Method to return the reference to the mongo_connection singleton

        Returns:
        MongoConnection: The reference to the singleton
        """
        return self.databaseCon

    def closeConnection(self): 
        return