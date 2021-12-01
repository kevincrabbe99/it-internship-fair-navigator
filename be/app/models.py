class Document:
    """
    A class used to represent the Document model

    Attributes:
    name (str): The name of the document
    link (str): The link to download the document
    data (dict): A dictionary containing the attributes of the model
        For easy json conversion
    """
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
    """
    A class used to represent the Map model

    Attributes:
    most_recent_year (int): The most recent year of the map
    available_years (list(int)): A list of the available years of maps
    tables (list(str)): A list containing IDs of the map's tables
    data (dict): A dictionary containing the attributes of the model
        For easy json conversion
    """
    def __init__(self, mr_year, avail_years, tables):
        self._most_recent_year = mr_year
        self._available_years = avail_years
        self._tables = tables
        self._data = {
            "most_recent_year": self._most_recent_year,
            "available_years": self._available_years,
            "tables": self._tables
        }

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

    def add_table(self, t):
        self._tables.append(t)

    def remove_table(self, t):
        self._tables.remove(t)

    def get_data(self):
        return self._data

    def yearExist(self, year):
        if (year in self._available_years):
            return True
        else:
            return False

    most_recent_year = property(get_most_recent_year, set_most_recent_year)
    available_years = property(get_available_years, set_available_years)
    tables = property(get_tables, set_tables)
    data = property(get_data)

class Table:
    """
    A class used to represent the Table model

    Attributes:
    number (int): The position (number) of the table in the map
    company (str): The ID of table's company
    marked (bool): Is the table marked or not
    data (dict): A dictionary containing the attributes of the model
        For easy json conversion
    """
    def __init__(self, num, company, marked):
        self._number = num
        self._company = company
        self._marked = marked
        self._data = {
            "number": self._number,
            "company": self._company,
            "marked": self._marked
        }

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

    number = property(get_number, set_number)
    company = property(get_company, set_company)
    marked = property(get_marked, set_marked)
    data = property(get_data)

class Company:
    """
    A class used to represent the Company model

    Attributes:
    name (str): The name of the company
    number_of_reps (int): The number of representatives of the company
    website (str): The URL of the company's website
    other_info (str): Any other pertinent info
    data (dict): A dictionary containing the attributes of the model
        For easy json conversion
    """
    def __init__(self, name, num_reps, site, other):
        self._name = name
        self._number_of_reps = num_reps
        self._website = site
        self._other_info = other
        self._data = {
            "name": self._name,
            "number_of_reps": self._number_of_reps,
            "website": self._website,
            "other_info": self._other_info
        }

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

    name = property(get_name, set_name)
    number_of_reps = property(get_number_of_reps, set_number_of_reps)
    website = property(get_website, set_website)
    other_info = property(get_other_info, set_other_info)
    data = property(get_data)

class EmailList:
    """
    A class used to represent the Email List model

    Attributes:
    email_list (list(str)): A list containing the email addresses subscribed
    data (dict): A dictionary containing the attributes of the model
        For easy json conversion
    """
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

    def subscribe(self, email):
        if email in self.email_list:
            return
        else:
            self.email_list.append(email)

    def unsubscribe(self, email):
        if email in self.email_list:
            self.email_list.remove(email)

    email_list = property(get_email_list, set_email_list)
    data = property(get_data)