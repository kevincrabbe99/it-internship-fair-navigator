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
            cls.dbname = os.getenv('DBNAME')
            cls.dbstring = f"mongodb+srv://{cls.user}:{cls.pwd}@navigatordb.vkpij.mongodb.net/{cls.dbname}?retryWrites=true&w=majority"
            cls.client = pymongo.MongoClient(cls.dbstring, tlsAllowInvalidCertificates=True)
            cls.db = cls.client['ITNavigatorDB']
        return cls._instance


    