import './searchbar.scss';
import mock from "./mock.json";
import React, { useContext, useEffect, useState } from 'react'
import { getTablesEndpoint } from '../../util/Endpoints'
import { MapContext } from '../../contexts/mapContext'
import { YearContext } from '../../contexts/yearContext'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconContext } from 'react-icons/lib';

export default function Searchbar() {
  
  const[searchTerm, setSearchTerm] = useState('');
  const { mapContext , setMapContext} = useContext(MapContext);
  const { yearData, setYearData } = useContext(YearContext);
  const [hasFocus, setFocus] = useState(false);
  var viewCompanyList;

  async function getTablesAsyncWrapper() {
      const res = await getTablesEndpoint(yearData.selected)
      // if (res.status === 200) {
      console.log("TABLES: ", yearData)
      setMapContext(res)
       }
        


  if (hasFocus) {
    getTablesAsyncWrapper();
    viewCompanyList = mock.filter((val)=> {
      if (searchTerm == "") {
        return val
      } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val
      }
    }).map((val,key)=> {
      return (
      <div className="user" key={key} onClick={window.open}> 
        <p>{val.name}</p>
      </div>
      );
    })
  }
  else {viewCompanyList = null}

  return (
  <div className="App">
    <input 
    type="text" 
    placeholder="Search for Company"  
    onChange={event => 
      {setSearchTerm(event.target.value)
      }}
    onFocus={() => setFocus(true)}
    // onBlur={() => setFocus(false)}
    />
    <FontAwesomeIcon icon = {faWindowClose} onClick={() => setFocus(false)}/>
    
    {viewCompanyList}
  </div>
  );
}