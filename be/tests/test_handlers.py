from ..app.handlers import *
from ..app.models import *
from ..app.mongo_connection import *

import pytest
import json

# Map Tests
def test_map_add():
    mry = 2021
    ay = [2019, 2020, 2021]
    tables = ["a1234", "b1234"]

    map = Map(mry, ay, tables)
    s_map = Map(mry, ay, ["a1234", "b1234"])

    mapjson = json.dumps(map.data, default=str)

    dbcon = MongoConnection()

    mh = MapHandler(dbcon, '1234', 'test', mapjson)

    mh.addTable('c1234')
    map.add_table('c1234')
    map2 = mh.map

    mh.s_addTable(s_map, 'c1234')
    s_map2 = Map(mry, ay, ["a1234", "b1234", "c1234"])

    assert map.data == map2.data, "Test Failed"
    assert s_map.data == s_map2.data, "Test Failed"


def test_map_remove():
    mry = 2021
    ay = [2019, 2020, 2021]
    tables = ["a1234", "b1234"]

    map = Map(mry, ay, tables)
    s_map = Map(mry, ay, ["a1234", "b1234"])

    mapjson = json.dumps(map.data, default=str)

    dbcon = MongoConnection()

    mh = MapHandler(dbcon, '1234', 'test', mapjson)

    mh.removeTable('b1234')
    map.remove_table('b1234')
    map2 = mh.map

    mh.s_removeTable(s_map, 'b1234')
    s_map2 = Map(mry, ay, ["a1234"])

    assert map.data == map2.data, "Test Failed"
    assert s_map.data == s_map2.data, "Test Failed"

def test_map_build():
    mry = 2021
    ay = [2019, 2020, 2021]
    tables = ["a1234", "b1234"]

    map = Map(mry, ay, tables)

    mapjson = json.dumps(map.data, default=str)

    dbcon = MongoConnection()

    mh = MapHandler(dbcon, '1234', 'test', mapjson)

    built_map = mh.buildMapFromJSON(mapjson)

    assert built_map.data == map.data, "Test Failed"

# Table Tests
def test_table_set_location():
    number = 1
    company = "a1234"
    marked = False

    table = Table(number, company, marked)
    s_table = Table(1, "a1234", marked)

    tablejson = json.dumps(table.data, default=str)

    dbcon = MongoConnection()

    th = TableHandler(dbcon, '1234', 'test', tablejson)

    th.setTableLocation(2)
    table.number = 2
    table2 = th.table

    th.s_setTableLocation(s_table, 2)
    s_table2 = Table(2, "a1234", marked)

    assert table.data == table2.data, "Test Failed"
    assert s_table.data == s_table2.data, "Test Failed"

def test_table_set_company():
    number = 1
    company = "a1234"
    marked = False

    table = Table(number, company, marked)
    s_table = Table(1, "a1234", marked)

    tablejson = json.dumps(table.data, default=str)

    dbcon = MongoConnection()

    th = TableHandler(dbcon, '1234', 'test', tablejson)

    th.setTableCompany('b1234')
    table.company = 'b1234'
    table2 = th.table

    th.s_setTableCompany(s_table, 'b1234')
    s_table2 = Table(1, "b1234", marked)

    assert table.data == table2.data, "Test Failed"
    assert s_table.data == s_table2.data, "Test Failed"

def test_table_build():
    number = 1
    company = "a1234"
    marked = False

    table = Table(number, company, marked)

    tablejson = json.dumps(table.data, default=str)

    dbcon = MongoConnection()

    th = TableHandler(dbcon, '1234', 'test', tablejson)

    built_table = th.buildTableFromJSON(tablejson)

    assert built_table.data == table.data, "Test Failed"

# Company Tests
def test_company_set_name():
    name = 'test'
    number_of_reps = 2
    website = 'isu.com'
    other_info = 'none'

    company = Company(name, number_of_reps, website, other_info)
    s_company = Company('test', number_of_reps, website, other_info)

    companyjson = json.dumps(company.data, default=str)

    dbcon = MongoConnection()

    ch = CompanyHandler(dbcon, '1234', 'test', companyjson)

    ch.setCompanyName('ISU')
    company.name = 'ISU'
    company2 = ch.company

    ch.s_setCompanyName(s_company, 'ISU')
    s_company2 = Company('ISU', number_of_reps, website, other_info)

    assert company.data == company2.data, "Test Failed"
    assert s_company.data == s_company2.data, "Test Failed"

def test_company_build():
    name = 'test'
    number_of_reps = 2
    website = 'isu.com'
    other_info = 'none'

    company = Company(name, number_of_reps, website, other_info)

    companyjson = json.dumps(company.data, default=str)

    dbcon = MongoConnection()

    ch = CompanyHandler(dbcon, '1234', 'test', companyjson)

    built_company = ch.buildCompanyFromJSON(companyjson)

    assert built_company.data == company.data, "Test Failed"

# Document Tests
def test_document_download():
    name = 'doc'
    link = 'test.org'

    document = Document(name, link)
    dbcon = MongoConnection()

    dh = DocumentHandler(dbcon, '1234', 'test', document)

    assert dh.downloadDocument() == document.link, "Test Failed"
    assert dh.s_downloadDocument(document) == document.link, "Test Failed"

# Email List Tests
def test_emaillist_subscribe():
    emails = ['abc@gmail.com', '123@yahoo.com']

    email_list = EmailList(emails)

    dbcon = MongoConnection()

    eh = EmailListHandler(dbcon, '1234', 'test', email_list)

    eh.signUpForEmailList('def@gmail.com')
    eh.signUpForEmailList('notanemail')
    email_list.subscribe('def@gmail.com')
    email_list2 = eh.emailList

    assert email_list.data == email_list2.data, "Test Failed"



def test_emaillist_unsubscribe():
    emails = ['abc@gmail.com', '123@yahoo.com']

    email_list = EmailList(emails)

    dbcon = MongoConnection()

    eh = EmailListHandler(dbcon, '1234', 'test', email_list)

    eh.unsubscribeFromEmailList('abcf@gmail.com')
    eh.unsubscribeFromEmailList('notanemail')
    email_list.unsubscribe('abc@gmail.com')
    email_list2 = eh.emailList

    assert email_list.data == email_list2.data, "Test Failed"
