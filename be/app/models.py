class Map:
    """
    A class used to represent the Map model

    Attributes:
    id (str): The ObjectID from mongodb
    year (int): The year of the map
    archived (bool): Is the map archived
    tables (list(str)): A list containing IDs of the map's tables
    data (dict): A dictionary containing the attributes of the model
        For easy json conversion
    """
    def __init__(self, id, year, arc, tables):
        self._id = id
        self._year = year
        self._archived = arc
        self._tables = tables
        self._data = {
            "id": self._id,
            "year": self._year,
            "archived": self._archived,
            "tables": self._tables
        }

    def get_id(self):
        return self._id
    def set_id(self, id):
        self._id = id
        self._data['id'] = id

    def get_year(self):
        return self._year
    def set_year(self, y):
        self._year = y
        self._data["year"] = y

    def get_archived(self):
        return self._archived
    def set_archived(self, a):
        self._archived = a
        self._data["archived"] = a

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

    id = property(get_id, set_id)
    year = property(get_year, set_year)
    archived = property(get_archived, set_archived)
    tables = property(get_tables, set_tables)
    data = property(get_data)

class Table:
    """
    A class used to represent the Table model

    Attributes:
    id (str): The ObjectId from mongodb
    x_coord (int): The x coordinates in the map
    y_coord (int): The y coordinates in the map
    company (str): The ID of table's company
    imageUrl (str): The url to the company's logo
    data (dict): A dictionary containing the attributes of the model
        For easy json conversion
    """
    def __init__(self, id, x_coord, y_coord, company, imageUrl):
        self._id = id
        self._x_coord = x_coord
        self._y_coord = y_coord
        self._company = company
        self._imageUrl = imageUrl
        self._data = {
            "id": self._id,
            "x_coord": self._x_coord,
            "y_coord": self._y_coord,
            'imageUrl': self._imageUrl,
            "company": self._company,
        }

    def get_id(self):
        return self._id
    def set_id(self, id):
        self._id = id
        self._data['id'] = id

    def get_x_coord(self):
        return self._x_coord
    def set_x_coord(self, x):
        self._x_coord = x
        self._data['x_coord'] = x

    def get_y_coord(self):
        return self._y_coord
    def set_y_coord(self, y):
        self._y_coord = y
        self._data['y_coord'] = y

    def get_company(self):
        return self._company
    def set_company(self, c):
        self._company = c
        self._data["company"] = c

    def get_url(self):
        return self._imageUrl
    def set_url(self, c):
        self._imageUrl = c
        self._data["imageUrl"] = c

    def get_data(self):
        return self._data

    id = property(get_id, set_id)
    x_coord = property(get_x_coord, set_x_coord)
    y_coord = property(get_y_coord, set_y_coord)
    company = property(get_company, set_company)
    imageUrl = property(get_url, set_url)
    data = property(get_data)

class Company:
    """
    A class used to represent the Company model

    Attributes:
    id (str): The ObjectID of the company in mongodb
    name (str): The name of the company
    number_of_reps (int): The number of representatives of the company
    website (str): The URL of the company's website
    other_info (str): Any other pertinent info
    data (dict): A dictionary containing the attributes of the model
        For easy json conversion
    """
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
        self._data['id'] = id

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