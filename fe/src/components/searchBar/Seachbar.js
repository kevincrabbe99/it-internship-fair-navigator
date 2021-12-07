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

  useEffect(() => {

    async function getTablesAsyncWrapper() {
        const res = await getTablesEndpoint(yearData.selected)
        console.log("TABLES: ", yearData)
        setMapContext(res)
        
    }
    console.log("MAP CONTEXT: ", yearData)
        if (yearData && yearData.selected) {
            getTablesAsyncWrapper();
        }
    }, [yearData])
  
 

  return (
  <div className="App">
    <input 
    type="text" 
    placeholder="Search for Company"  
    onChange={e => setSearchTerm(e.target.value)}
    onFocus={() => setFocus(true)}
    />
    <FontAwesomeIcon icon = {faWindowClose} onClick={() => setFocus(false)}/>
    
    {
      hasFocus &&
        mapContext.tables.filter((val)=> {
          if (searchTerm == "") {
            return val
          } else if (val && val.company && val.company.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          }
        }).map((val,key)=> (
            <div className="user" key={key} onClick={() => window.open(val.company.website)}>
              <p>{val && val.company && val.company.name &&
                  val.company.name}</p>
            </div>
        ))
      }
    }
  </div>
  );
}