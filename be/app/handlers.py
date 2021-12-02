import json

from abc import ABC, ABCMeta, abstractmethod

from flask.json import jsonify
from bson.objectid import ObjectId

from app.models import *
from app.mongo_connection import *
from app.util import check_email

class DatabaseObject(metaclass=ABCMeta):
    def __init__(self, databaseCon: MongoConnection):
        self.databaseCon = databaseCon

    @abstractmethod
    def getConnection():
        raise NotImplementedError

    @abstractmethod
    def closeConnection():
        raise NotImplementedError

    def _read_all(self, collection, search = {}):
        if collection in self.databaseCon.collection_list:
            documents = self.databaseCon.db[collection].find(search)
            if documents is not None:
                return list(documents)
            else:
                return None

    def _read_one(self, collection, search = {}):
        if collection in self.databaseCon.collection_list:
            documents = self.databaseCon.db[collection].find_one(search)
            if documents is not None:
                return documents
            else:
                return None

    def _write(self, collection, data = {}):
        if collection in self.databaseCon.collection_list:
            response = self.databaseCon.db[collection].insert_one(data)
            return response

    def _update(self, collection, item = {}, data = {}):
        if collection in self.databaseCon.collection_list:
            response = self.databaseCon.db[collection].replace_one(item, data, True)
            return response

    def _delete(self, collection, item = {}):
        if collection in self.databaseCon.collection_list:
            response = self.databaseCon.db[collection].delete_one(item)
            return response

class MapHandler(DatabaseObject):
    """
    A class used to handle CRUD operations between Map model and the DB

    Attributes:
    databaseCon (MongoConnection): The MongoConnection singleton
    """

    collection = "maps"

    def __init__(self, databaseCon: MongoConnection):
        """
        Parameters:
        databaseCon (MongoConnection): The MongoConnection singleton
        """
        super().__init__(databaseCon)
    
    def createMap(self, map: Map):
        """
        Method to add map to DB

        Parameters:
        map (Map): The map to use

        Returns:
        str: ObjectID of the inserted map
        """
        data = map.data
        data.pop('id', None)
        try:
            raw = super()._write(self.collection, data)
            new_id = raw.inserted_id
            return str(new_id)
        except:
            return None

    def readMapByID(self, id: str):
        """
        Method to query a specific company
        Parameters:
        id (str): The ObjectID(_id) of the company to query
        
        Returns:
        dictionary: The queried document
        """
        search = {'_id': ObjectId(id)}

        try:
            result = super()._read_one(self.collection, search)
            return result
        except:
            return None

    def readMapByYear(self, year: int):
        """
        Method to query a specific map
        Parameters:
        year (int): The year of the map to query
        
        Returns:
        dictionary: The queried document
        """
        search = {'year': year}

        try:
            result = super()._read_one(self.collection, search)
            return result
        except:
            return None

    def readAllMaps(self):
        """
        Method to query all maps
        
        Returns:
        list: List of maps
        """
        try:
            result = super()._read_all(self.collection)
            return result
        except: 
            return None

    def updateMap(self, id: str, map: Map):
        """
        Method to update an existing map in the DB
            Replaces an existing map (in db) with
            the map parameter, maintaining id

        Parameters:
        id (str): The ObjectID(_id) of the map to update
        map (Map): The new map object
        
        Returns:
        string: Count of modified documents (should be 1)
        """
        item = {'_id': ObjectId(id)}
        data = {"year": map.data['year'],
                "archived": map.data['archived'],
                "tables": map.data['tables']}

        try:
            raw = super()._update(self.collection, item, data)
            result = raw.modified_count
            return result
        except:
            return None

    def deleteMap(self, id: str):
        """
        Method to remove a map from the DB

        Parameters:
        id (str): The ObjectID(_id) of the map to remove
        
        Returns:
        int: Count of deleted objects (should be 1)
        """
        item = {'_id': ObjectId(id)}
        try:
            raw = super()._delete(self.collection, item)
            result = raw.deleted_count
            return result
        except: 
            return None
    
    def getAllYears(self):
        """
        Method to return a list of all years in db

        Returns:
        list(): List of all years
        """
        years = list()

        maps = self.readAllMaps()
        for map in maps:
            year = map['year']
            years.append(year)

        return years

    def jsonifyAllMapData(self, map: Map):
        """
        Method to return a json object of the map model including all sub models

        Parameters:
        map (Map): The Map to use

        Returns:
        str: The json object
        """ 
        th = TableHandler(self.databaseCon)
        ch = CompanyHandler(self.databaseCon)

        data = map.data
        tables_list = list()
        for table in data['tables']:
            table_data = th.readTableByID(table)
            comp = table_data['company']
            company_data = ch.readCompanyByID(comp)
            new_table_data = {'_id': table,
                              'x_coord': table_data['x_coord'],
                              'y_coord': table_data['y_coord'],
                              'company': company_data}
            tables_list.append(new_table_data)

        new_data = {'_id': data['id'],
                    'tables': tables_list,
                    'archived': data['archived'],
                    'year': data['year']}
        return json.dumps(new_data, default=str)

    @staticmethod
    def addTable(map: Map, table: str):
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
    def removeTable(map: Map, table: str):
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

    @staticmethod
    def buildMapFromJSON(mapJSON: str):
        """
        Static method that build the map object from a json string

        Parameters:
        mapJSON (json): The JSON object containing map parameters

        Returns:
        Map: The built map object
        """
        data = json.loads(mapJSON)
        id = data["_id"]
        year = data["year"]
        archived = data["archived"]
        tables = data["tables"]
        m = Map(id, year, archived, tables)
        return m

    @staticmethod
    def jsonifyMap(map: Map):
        """
        Static method to return a json object of the map model

        Parameters:
        map (Map): The Map to use

        Returns:
        str: The json object
        """
        data = json.dumps(map.data)
        return data

    def getConnection(self):
        """
        Method to return the reference to the mongo_connection singleton

        Returns:
        MongoConnection: The reference to the singleton
        """
        return self.databaseCon

    def closeConnection(self):
        '''
        Method to remove the reference to mongo_connection
        
        Returns:
        Nothing
        '''
        self.databaseCon = None
        return

class TableHandler(DatabaseObject):
    """
    A class used to handle CRUD operations between Table model and the DB

    Attributes:
    databaseCon (MongoConnection): The MongoConnection singleton
    """

    collection = "tables"

    def __init__(self, databaseCon: MongoConnection):
        """
        Parameters:
        databaseCon (MongoConnection): The MongoConnection singleton
        """
        super().__init__(databaseCon)
    
    
    def createTable(self, table: Table):
        """
        Method to add table to DB

        Parameters:
        table (Table): The table to use

        Returns:
        string: ObjectID of the inserted table
        """
        data = table.data
        data.pop('id', None)
        try:
            raw = super()._write(self.collection, data)
            new_id = raw.inserted_id
            return str(new_id)
        except:
            return None

    def readTableByID(self, id: str):
        """
        Method to query a specific table

        Parameters:
        id (str): The ObjectID(_id) of the table to query
        
        Returns:
        dictionary: The queried document
        """
        search = {'_id': ObjectId(id)}

        try:
            result = super()._read_one(self.collection, search)
            return result
        except:
            return None

    def readAllTables(self):
        """
        Method to query all tables
        
        Returns:
        list: List of tables
        """
        try:
            result = super()._read_all(self.collection)
            return result
        except: 
            return None

    def updateTable(self, id: str, table: Table):
        """
        Method to update an existing table in the DB
            Replaces an existing table (in db) with
            the table parameter, maintaining id

        Parameters:
        id (str): The ObjectID(_id) of the table to update
        table (Table): The new table object
        
        Returns:
        string: Count of modified documents (should be 1)
        """
        item = {'_id': ObjectId(id)}
        data = table.data
        data.pop('id', None)

        try:
            raw = super()._update(self.collection, item, data)
            result = raw.modified_count
            return result
        except:
            return None

    def deleteTable(self, id: str):
        """
        Method to remove a table from the DB

        Parameters:
        id (str): The ObjectID(_id) of the table to remove
        
        Returns:
        int: Count of deleted objects (should be 1)
        """
        item = {'_id': ObjectId(id)}
        try:
            raw = super()._delete(self.collection, item)
            result = raw.deleted_count
            return result
        except: 
            return None

    @staticmethod
    def setTableLocation(table: Table, x: int, y: int):
        """
        Static method that sets a table's location in the map

        Parameters:
        table (Table): The table to use
        x (int): The position of the table in the map
        y (int): The position of the table in the map

        Returns:
        Table: The updated table
        """
        table.x_coord = x
        table.y_coord = y
        return table

    @staticmethod
    def setTableCompany(table: Table, company: str):
        """
        Static method that sets a table's company

        Parameters:
        table (Table): The table to use
        company (str): The ID of the company to set

        Returns:
        Table: The updated table
        """
        table.company = company
        return table

    @staticmethod
    def buildTableFromJSON(tableJSON: str):
        """
        Class method that build the table object from a json string

        Parameters:
        tableJSON (str): The JSON object containing table parameters

        Returns:
        Table: The built table object
        """
        data = json.loads(tableJSON)
        id = data["_id"]
        x_coord = data["x_coord"]
        y_coord = data["y_coord"]
        company = data["company"]
        t = Table(id, x_coord, y_coord, company)
        return t

    @staticmethod
    def jsonifyTable(table: Table):
        """
        Static method to return a json object of the table model

        Parameters:
        table (Table): The Map to use

        Returns:
        string: The json object
        """
        data = json.dumps(table.data)
        return data
    
    def getConnection(self):
        """
        Method to return the reference to the mongo_connection singleton

        Returns:
        MongoConnection: The reference to the singleton
        """
        return self.databaseCon

    def closeConnection(self):
        '''
        Method to remove the reference to mongo_connection
        
        Returns:
        Nothing
        '''
        self.databaseCon = None
        return

class CompanyHandler(DatabaseObject):
    """
    A class used to handle CRUD operations between Company model and the DB

    Attributes:
    databaseCon (MongoConnection): The MongoConnection singleton
    collection (str): The collection in the DB
    """

    collection = "companies"

    def __init__(self, databaseCon: MongoConnection):
        """
        Parameters:
        dataBaseCon (MongoConnection): The MongoConnection singleton
        """
        super().__init__(databaseCon)
    
    def createCompany(self, company: Company):
        """
        Method to add company to DB

        Parameters:
        company (Company): The company to use

        Returns:
        string: ObjectID of the inserted company
        """
        data = company.data
        data.pop('id', None)
        try:
            raw = super()._write(self.collection, data)
            new_id = raw.inserted_id
            return str(new_id)
        except:
            return None

    def readCompanyByID(self, id: str):
        """
        Method to query a specific company
        Parameters:
        id (str): The ObjectID(_id) of the company to query
        
        Returns:
        dictionary: The queried document
        """
        search = {'_id': ObjectId(id)}

        try:
            result = super()._read_one(self.collection, search)
            return result
        except:
            return None

    def readCompanyByName(self, name: str):
        """
        Method to query a specific company
        Parameters:
        name (str): The name of the company to query
        
        Returns:
        dictionary: The queried document
        """
        search = {'name': name}

        try:
            result = super()._read_one(self.collection, search)
            return result
        except:
            return None

    def readAllCompanies(self):
        """
        Method to query all companies
        
        Returns:
        list: List of companies
        """
        try:
            result = super()._read_all(self.collection)
            return result
        except: 
            return None

    def updateCompany(self, id: str, company: Company):
        """
        Method to update an existing company in the DB
            Replaces an existing company (in db) with
            the company parameter, maintaining id

        Parameters:
        id (str): The ObjectID(_id) of the company to update
        company (Company): The new company object
        
        Returns:
        string: Count of modified documents (should be 1)
        """
        item = {'_id': ObjectId(id)}
        data = company.data
        data.pop('id', None)

        try:
            raw = super()._update(self.collection, item, data)
            result = raw.modified_count
            return result
        except:
            return None

    def deleteCompany(self, id: str):
        """
        Method to remove a company from the DB

        Parameters:
        id (str): The ObjectID(_id) of the company to remove
        
        Returns:
        int: Count of deleted objects (should be 1)
        """
        item = {'_id': ObjectId(id)}
        try:
            raw = super()._delete(self.collection, item)
            result = raw.deleted_count
            return result
        except: 
            return None


    @staticmethod
    def setCompanyName(company: Company, name: str):
        """
        Static method that sets the name of company

        Parameters:
        company (Company): The company to use
        name (str): The name of the company to change

        Returns:
        Company: The updated Company
        """
        company.name = name
        return company

    @staticmethod
    def buildCompanyFromJSON(companyJSON: str):
        """
        Static method that build the company object from a json string

        Parameters:
        companyJSON (str): The JSON object containing company parameters

        Returns:
        Company: The built company object
        """
        data = json.loads(companyJSON)
        id = data['_id']
        name = data["name"]
        number_of_reps = data["number_of_reps"]
        website = data["website"]
        other_info = data["other_info"]
        c = Company(id, name, number_of_reps, website, other_info)
        return c

    @staticmethod
    def jsonifyCompany(company: Company):
        """
        Static method to return a json object of the table model

        Parameters:
        table (Table): The Map to use

        Returns:
        str: The json object
        """
        data = json.dumps(company.data)
        return data
    
    def getConnection(self):
        """
        Method to return the reference to the mongo_connection singleton

        Returns:
        MongoConnection: The reference to the singleton
        """
        return self.databaseCon

    def closeConnection(self):
        '''
        Method to remove the reference to mongo_connection
        
        Returns:
        Nothing
        '''
        self.databaseCon = None
        return

class EmailListHandler(DatabaseObject):
    """
    A class used to handle CRUD operations between EmailList model and the DB

    Attributes:
    databaseCon (MongoConnection): The MongoConnection singleton
    """
    
    collection = "email_list"

    def __init__(self, databaseCon: MongoConnection):
        """
        Parameters:
        dataBaseCon (MongoConnection): The MongoConnection singleton
        accesToken (str):
        user (User):
        """
        super().__init__(databaseCon)

    def createEmail(self, email: str):
        """
        Method to add an email to DB

        Parameters:
        email (str): The email to insert

        Returns:
        string: ObjectID of the inserted email
        """

        data = {"email": email}
        try:
            raw = super()._write(self.collection, data)
            new_id = raw.inserted_id
            return str(new_id)
        except:
            return None

    def readEmailList(self):
        """
        Method to query all stored emails
        
        Returns:
        list: List of emails & ids
        """
        try:
            result = super()._read_all(self.collection)
            return result
        except: 
            return None

    def readEmail(self, email: str):
        """
        Method to query a specific email
        
        Parameters:
        email (str): The email to query

        Returns:
        dictionary: The queried email
        """
        search = {'email': email}

        try:
            result = super()._read_one(self.collection, search)
            return result
        except:
            return None

    def deleteEmail(self, id: str):
        """
        Method to remove an email from the DB

        Parameters:
        id (str): The ObjectID(_id) of the email to remove
        
        Returns:
        int: Count of deleted objects (should be 1)
        """
        item = {'_id': ObjectId(id)}
        try:
            raw = super()._delete(self.collection, item)
            result = raw.deleted_count
            return result
        except: 
            return None
    
    @staticmethod
    def signUpForEmailList(email_list: EmailList, email: str):
        """
        Static method that adds an email to the email_list attribute

        Parameters:
        email (string): The string containing the email to add

        Returns:
        EmailList: The updated EmailList
        """
        if check_email(email):
            email_list.subscribe(email)
        return email_list

    @staticmethod
    def unsubscribeFromEmailList(email_list: EmailList, email: str):
        """
        Static method that removes an email from any emaillist

        Parameters:
        email (string): The string containing the email to remove

        Returns:
        EmailList: The updated EmailList
        """
        if check_email(email):
            email_list.unsubscribe(email)
        return email_list
    
    def getConnection(self):
        """
        Method to return the reference to the mongo_connection singleton

        Returns:
        MongoConnection: The reference to the singleton
        """
        return self.databaseCon

    def closeConnection(self): 
        '''
        Method to remove the reference to mongo_connection
        
        Returns:
        Nothing
        '''
        self.databaseCon = None
        return

class AdminHandler(DatabaseObject):
    """
    A class used to handle operations between Admin object and the DB

    Attributes:
    databaseCon (MongoConnection): The MongoConnection singleton
    """
    
    collection = "admin"

    def __init__(self, databaseCon: MongoConnection):
        """
        Parameters:
        dataBaseCon (MongoConnection): The MongoConnection singleton
        accesToken (str):
        user (User):
        """
        super().__init__(databaseCon)

    def insertAdminSessionUUID(self, uuid: str):
        """
        Method to insert an admin session into the db

        Parameters:
        uuid (str): The uuid to insert

        Returns:
        str: The ObjectID(_id) of the inserted uuid
        """
        data = {"uuid": uuid}
        try:
            raw = super()._write(self.collection, data)
            new_id = raw.inserted_id
            return str(new_id)
        except:
            return None

    def getUUID_ObjectID(self, uuid: str):
        """
        Method to query a uuid, returning the ObjectId
            *needed for deletion

        Parameters:
        uuid (str): The uuid to query

        Returns:
        id (str): The ObjectId() of the uuid
        """
        search = {'uuid': uuid}

        try:
            result = super()._read_one(self.collection, search)
            return result['_id']
        except:
            return None

    def deleteAdminSessionUUID(self, id: str):
        """
        Method to delete an admin session UUID from db

        Parameters:
        id (str): The ObjectId of the session to remove *NOT THE UUID*

        Returns:
        int: Count of deleted objects (should be 1)
        """
        item = {'_id': ObjectId(id)}
        try:
            raw = super()._delete(self.collection, item)
            result = raw.deleted_count
            return result
        except: 
            return None

    def getConnection(self):
        """
        Method to return the reference to the mongo_connection singleton

        Returns:
        MongoConnection: The reference to the singleton
        """
        return self.databaseCon

    def closeConnection(self): 
        '''
        Method to remove the reference to mongo_connection
        
        Returns:
        Nothing
        '''
        self.databaseCon = None
        return