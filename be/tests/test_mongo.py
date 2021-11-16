from be.mongo_connection import *
import pytest

def test_mongo_singleton():
    m = MongoConnection()
    m2 = MongoConnection()

    assert m == m2, "Test Failed"

def test_mongo_db():
    m = MongoConnection()
    collection_name = "it_nav"
    build = m.db.command("buildinfo")
    test = m.db[collection_name]
    test.insert_one({ 'data': 'result' })

    assert build is not None, "Test Failed"