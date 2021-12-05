import './searchbar.scss';
import Data from "./mock.json";
import React, {useState} from "react";
import { getTablesEndpoint } from '../../util/Endpoints'
import { MapContext } from '../../contexts/mapContext'
import { YearContext } from '../../contexts/yearContext'

export default function Searchbar() {
  
  const[searchTerm, setSearchTerm] = useState('');
  const [hasFocus, setFocus] = useState(false);
  var viewCompanyList

  if (hasFocus) {
    viewCompanyList = Data.filter((val)=> {
      if (searchTerm == "") {
        return val
      } else if (val.Company_Name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val
      }
    }).map((val,key)=> {
      return (
      <div className="user" key={key} onClick={window.open}> 
        <p>{val.Company_Name}</p>
      </div>
      );
    })
  }
  else {viewCompanyList = null}

  return (
  <div className="App">
    <input 
    type="text" 
    placeholder="Search..."  
    onChange={event => 
      {setSearchTerm(event.target.value)
      }}
    onFocus={() => setFocus(true)}
    onBlur={() => setFocus(false)}
    />
    {/* {mapContext.tables[2].x_coord} */}
    {viewCompanyList}
  </div>
  );
}