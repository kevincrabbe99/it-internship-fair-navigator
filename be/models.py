class Document:
    def __init__(self, name, link):
        self._name = name
        self._link = link
        self._data = {
            "name": self._name,
            "link": self._link
        }

    def get_name(self):
        return self._name
    def set_name(self, n):
        self._name = n
        self._data["name"] = n

    def get_link(self):
        return self._link
    def set_link(self, l):
        self._link = l
        self._data["link"] = l

    def get_data(self):
        return self._data

    name = property(get_name, set_name)
    link = property(get_link, set_link)
    data = property(get_data)

class Map:
    def __init__(self, id, mr_year, avail_years, tables):
        self._id = id
        self._most_recent_year = mr_year
        self._available_years = avail_years
        self._tables = tables
        self._data = {
            "id": self._id,
            "most_recent_year": self._most_recent_year,
            "available_years": self._available_years,
            "tables": self._tables
        }

    def get_id(self):
        return self._id
    def set_id(self, id):
        self._id = id
        self._data["id"] = id

    def get_most_recent_year(self):
        return self._most_recent_year
    def set_most_recent_year(self, mry):
        self._most_recent_year = mry
        self._data["most_recent_year"] = mry

    def get_available_years(self):
        return self._available_years
    def set_available_years(self, ay):
        self._available_years = ay
        self._data["available_years"] = ay

    def get_tables(self):
        return self._tables
    def set_tables(self, t):
        self._tables = t
        self._data["tables"] = t

    def get_data(self):
        return self._data

    id = property(get_id, set_id)
    most_recent_year = property(get_most_recent_year, set_most_recent_year)
    available_years = property(get_available_years, set_available_years)
    tables = property(get_tables, set_tables)
    data = property(get_data)

    def addTable(self, table):
        self._tables.append(table)
        return
    
    def removeTable(self, table):
        self._tables.remove(table)
        return

    def yearExist(self, year):
        if (year in self._available_years):
            return True
        else:
            return False

class Table:
    def __init__(self, id, num, company, marked):
        self._id = id
        self._number = num
        self._company = company
        self._marked = marked
        self._data = {
            "id": self._id,
            "number": self._number,
            "company": self._company,
            "marked": self._marked
        }

    def get_id(self):
        return self._id
    def set_id(self, id):
        self._id = id
        self._data["id"] = id

    def get_number(self):
        return self._number
    def set_number(self, n):
        self._number = n
        self._data["number"] = n

    def get_company(self):
        return self._company
    def set_company(self, c):
        self._company = c
        self._data["company"] = c

    def get_marked(self):
        return self._marked
    def set_marked(self, m):
        self._marked = m
        self._data["marked"] = m

    def get_data(self):
        return self._data

    id = property(get_id, set_id)
    number = property(get_number, set_number)
    company = property(get_company, set_company)
    marked = property(get_marked, set_marked)
    data = property(get_data)

class Company:
    def __init__(self, id, name, num_reps, site, other):
        self._id = id
        self._name = name
        self._number_of_reps = num_reps
        self._website = site
        self._other_info = other
        self._data = {
            "id": self._id,
            "name": self._name,
            "number_of_reps": self._number_of_reps,
            "website": self._website,
            "other_info": self._other_info
        }

    def get_id(self):
        return self._id
    def set_id(self, id):
        self._id = id
        self._data["id"] = id

    def get_name(self):
        return self._name
    def set_name(self, n):
        self._name = n
        self._data["name"] = n

    def get_number_of_reps(self):
        return self._number_of_reps
    def set_number_of_reps(self, nr):
        self._number_of_reps = nr
        self._data["number_of_reps"] = nr

    def get_website(self):
        return self._website
    def set_website(self, w):
        self._website = w
        self._data["website"] = w

    def get_other_info(self):
        return self._other_info
    def set_other_info(self, o):
        self._other_info = o
        self._data["other_info"] = o

    def get_data(self):
        return self._data

    id = property(get_id, set_id)
    name = property(get_name, set_name)
    number_of_reps = property(get_number_of_reps, set_number_of_reps)
    website = property(get_website, set_website)
    other_info = property(get_other_info, set_other_info)
    data = property(get_data)

class EmailList:
    def __init__(self, emails):
        self._email_list = emails
        self._data = {
            "email_list": self._email_list
        }

    def get_email_list(self):
        return self._email_list
    def set_email_list(self, e):
        self._email_list = e
        self._data["email_list"] = e

    def get_data(self):
        return self._data

    email_list = property(get_email_list, set_email_list)
    data = property(get_data)