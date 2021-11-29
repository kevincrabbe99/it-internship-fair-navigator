import pymongo
import ssl
import os
from dotenv import load_dotenv

class MongoConnection(object):
    """
    Singleton
    """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MongoConnection, cls).__new__(cls)
            load_dotenv()
            cls.user = os.getenv('DBUSER')
            cls.pwd = os.getenv('DBPWD')
            cls.dbname = os.getenv('DBNAMEDEV')
            cls.dbstring = f"mongodb+srv://{cls.user}:{cls.pwd}@navigatordb.vkpij.mongodb.net/{cls.dbname}?retryWrites=true&w=majority"
            cls.client = pymongo.MongoClient(cls.dbstring, tlsAllowInvalidCertificates=True)
            cls.db = cls.client[cls.dbname]
            cls.collection_list = cls.db.list_collection_names()
        return cls._instance

    def read_all(self, collection, search = {}):
        if collection in self.collection_list:
            documents = self.db[collection].find(search)
            if documents is not None:
                return list(documents)
            else:
                return None

    def read_one(self, collection, search = {}):
        if collection in self.collection_list:
            documents = self.db[collection].find_one(search)
            if documents is not None:
                return documents
            else:
                return None

    def write(self, collection, data = {}):
        if collection in self.collection_list:
            response = self.db[collection].insert_one(data)
            return response

    def update(self, collection, item = {}, data = {}):
        if collection in self.collection_list:
            response = self.db[collection].replace_one(item, data, True)
            return response

    def delete(self, collection, item = {}):
        if collection in self.collection_list:
            response = self.db[collection].delete_one(item)
            return response
        



    