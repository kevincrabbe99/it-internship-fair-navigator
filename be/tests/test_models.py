from be.app.models import *
import pytest

def test_document_get():
    name = "test"
    link = "link"
    data = {
            "name": name,
            "link": link
    }

    d = Document(name, link)

    assert d.name == name, "Test Failed"
    assert d.link == link, "Test Failed"
    assert d.data == data, "Test Failed"

def test_document_set():
    name = "test"
    name2 = "test2"
    link = "link"
    link2 = "link2"
    data = {
        "name": name2,
        "link": link2
    }

    d = Document(name, link)
    d.name = name2
    d.link = link2

    assert d.name == name2, "Test Failed"
    assert d.link == link2, "Test Failed"
    assert d.data == data, "Test Failed"

def test_map_get():
    id = 1
    most_recent_year = 2021
    available_years = [2020, 2021]
    t1 = Table(1, 1, Company(1, "test", 2, "test.org", "none"), False)
    tables = [t1]
    data = {
        "id": id,
        "most_recent_year": most_recent_year,
        "available_years": available_years,
        "tables": tables
    }

    m = Map(id, most_recent_year, available_years, tables)

    assert m.id == id, "Test Failed"
    assert m.most_recent_year == most_recent_year, "Test Failed"
    assert m.available_years == available_years, "Test Failed"
    assert m.tables == tables, "Test Failed"
    assert m.data == data, "Test Failed"

def test_map_set():
    id = 1
    id2 = 2
    most_recent_year = 2021
    most_recent_year2 = 2020
    available_years = [2020, 2021]
    available_years2 = [2019, 2020]
    t1 = Table(1, 1, Company(1, "test", 2, "test.org", "none"), False)
    t2 = Table(2, 1, Company(2, "test2", 2, "test.org", "none"), False)
    tables = [t1]
    tables2 = [t2]
    data = {
        "id": id2,
        "most_recent_year": most_recent_year2,
        "available_years": available_years2,
        "tables": tables2
    }

    m = Map(id, most_recent_year, available_years, tables)
    m.id = id2
    m.most_recent_year = most_recent_year2
    m.available_years = available_years2
    m.tables = tables2

    assert m.id == id2, "Test Failed"
    assert m.most_recent_year == most_recent_year2, "Test Failed"
    assert m.available_years == available_years2, "Test Failed"
    assert m.tables == tables2, "Test Failed"
    assert m.data == data, "Test Failed"

def test_table_get():
    id = 1
    number = 1
    company = Company(1, "test", 2, "test.org", "none")
    marked = False
    data = {
        "id": id,
        "number": number,
        "company": company,
        "marked": marked
    }

    t = Table(id, number, company, marked)

    assert t.id == id, "Test Failed"
    assert t.number == number, "Test Failed"
    assert t.company == company, "Test Failed"
    assert t.marked == marked, "Test Failed"
    assert t.data == data, "Test Failed"

def test_table_set():
    id = 1
    id2 = 2
    number = 1
    number2 = 2
    company = Company(1, "test", 2, "test.org", "none")
    company2 = Company(2, "test2", 2, "test.org", "none")
    marked = False
    marked2 = True
    data = {
        "id": id2,
        "number": number2,
        "company": company2,
        "marked": marked2
    }

    t = Table(id, number, company, marked)
    t.id = id2
    t.number = number2
    t.company = company2
    t.marked = marked2

    assert t.id == id2, "Test Failed"
    assert t.number == number2, "Test Failed"
    assert t.company == company2, "Test Failed"
    assert t.marked == marked2, "Test Failed"
    assert t.data == data, "Test Failed"

def test_company_get():
    id = 1
    name = "test"
    number_of_reps = 1
    website = "test.org"
    other_info = "none"
    data = {
        "id": id,
        "name": name,
        "number_of_reps": number_of_reps,
        "website": website,
        "other_info": other_info
    }

    c = Company(id, name, number_of_reps, website, other_info)

    assert c.id == id, "Test Failed"
    assert c.name == name, "Test Failed"
    assert c.number_of_reps == number_of_reps, "Test Failed"
    assert c.website == website, "Test Failed"
    assert c.other_info == other_info, "Test Failed"
    assert c.data == data, "Test Failed"

def test_company_set():
    id = 1
    id2 = 2
    name = "test"
    name2 = "test2"
    number_of_reps = 1
    number_of_reps2 = 2
    website = "test.org"
    website2 = "test.com"
    other_info = "none"
    other_info2 = "something"
    data = {
        "id": id2,
        "name": name2,
        "number_of_reps": number_of_reps2,
        "website": website2,
        "other_info": other_info2
    }

    c = Company(id, name, number_of_reps, website, other_info)
    c.id = id2
    c.name = name2
    c.number_of_reps = number_of_reps2
    c.website = website2
    c.other_info = other_info2

    assert c.id == id2, "Test Failed"
    assert c.name == name2, "Test Failed"
    assert c.number_of_reps == number_of_reps2, "Test Failed"
    assert c.website == website2, "Test Failed"
    assert c.other_info == other_info2, "Test Failed"
    assert c.data == data, "Test Failed"

def test_emaillist_get():
    email_list = ["test@gmail.com", "test@yahoo.com"]
    data = {
        "email_list": email_list
    }

    e = EmailList(email_list)

    assert e.email_list == email_list, "Test Failed"
    assert e.data == data, "Test Failed"

def test_emaillist_set():
    email_list = ["test@gmail.com", "test@yahoo.com"]
    email_list2 = ["test2@gmail.com", "test2@yahoo.com"]
    data = {
        "email_list": email_list2
    }

    e = EmailList(email_list)
    e.email_list = email_list2

    assert e.email_list == email_list2, "Test Failed"
    assert e.data == data, "Test Failed"
