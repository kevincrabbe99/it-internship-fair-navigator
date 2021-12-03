import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData.js';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { isAdmin, UserContext } from '../../contexts/userContext.js';
import { addNewYear } from '../../util/Endpoints.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { YearContext } from '../../contexts/yearContext.js';
import { structureYearState } from '../../contexts/yearContext.js';
import { getAvailableYears } from '../../util/Endpoints.js';
import { logoutUser } from '../../contexts/userContext.js';

function Navbar() {

  const { user, setUser } = useContext(UserContext)
  const { yearData, setYearData } = useContext(YearContext)

  const [sidebar, setSidebar] = useState(false);

  const [modalShowing, setModalShowing] = useState(false);
  const [showAddYearModal, setShowAddYearModal] = useState(false);
  const [showCreateTableModal, setShowCreateTableModal] = useState(false);
  
  const [availableYears, setAvailableYears] = useState([]);
  const [newYearValue, setNewYearValue] = useState(null);
  const [submitAddYear, setSubmitAddYear] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const showSidebar = () => setSidebar(!sidebar);


  const handleClick = (address) => {
    window.open(address);
  }

  // use effect for when window loads
  // load years
  // TODO: load tables
  useEffect(() => {
    async function getAvailableYearsAsyncWrapper() {
      const res = await getAvailableYears();
      if (res === null) {
        return
      }

      var selected = (yearData && yearData.selected) ? yearData.selected : res[res.length - 1];

      const yearState = structureYearState(selected, res)
      console.log("YEAR STATE: ", yearState)
      setYearData(yearState)
    }

    getAvailableYearsAsyncWrapper();
  }, [window])
  
  useEffect(() => { 
    async function submitNewYearAsyncWrapper() {
      const res = await addNewYear(user.uuid, newYearValue);
      console.log("ARRAY WITH ALL VALID YEARS: ", res);

      if (res != 'Map already exists for this year' && res.includes(newYearValue)) {
        // structure yearData
        const yearState = structureYearState(newYearValue, res)
        console.log("YEAR STATE: ", yearState)
        setYearData(yearState)
        setAvailableYears(res)
        setModalShowing(false) 
      } else {
        if (yearData && yearData.available.includes(newYearValue)) {
          const yearState = structureYearState(newYearValue, yearData.available)
          setYearData(yearState)
          setModalShowing(false)
          console.log("setting to already existing year: ", yearState)
        }
      }

    }

    if (submitAddYear !== null) {
      submitNewYearAsyncWrapper();
    }
  }, [submitAddYear])

  // for hiding the shading behind the modal
  useEffect(() => {
    if (!modalShowing) {
      setShowAddYearModal(false)
      setShowCreateTableModal(false)
    }
  }, [modalShowing])

  // for triggering the shader behind the modal
  useEffect(() => {
    if (showAddYearModal || showCreateTableModal) {
      setModalShowing(true);
    } else {
      setModalShowing(false);
    }
  }, [showAddYearModal, showCreateTableModal])


  const generateAdminButtons = () => {
    if (!isAdmin()) {
      return null;
    }  

    return ( 
    <>
      <li>
        <div className='button' onClick={() => setShowCreateTableModal(true)}> 
          CREATE TABLE
        </div>
      </li>
      <li>
        <button type="button" class="button" onClick={() => setShowAddYearModal(true)}>
          ADD YEAR
        </button>
      </li>
    </>
    )
  }

  const setYearTo = (val) => {
    setYearData(structureYearState(val, yearData.available))
  }

  const logoutUserClick = () => {

    localStorage.removeItem("adminToken")
    setUser(null)

    // TODO: delete from database
    // logoutUser(user.uuid).then(() => {

    // })
  }

  const [tableId, setTableId] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [name, setName] = useState(null);
  const [numReps, setNumReps] = useState(null);
  const [website, setWebsite] = useState(null);
  const [notes, setNotes] = useState(null);
  const [year, setYear] = useState(null);

  function submit(){
    const url = "api.itfnavigator.com/api/navigator/" + 
        "{_id: " + tableId + ", _x_coord: " + x + ", _y_coord: " + y + ", _company: {_name: " + name + ", _number_of_reps: " + numReps + ",_website: " + website + ", _other_info: " + notes + "}, _year: " + year + "}";
    const response = fetch(url);
    return response;
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='logo'>
            <h1>
                <Link to = "/">IT Navigator</Link>
            </h1>
          </div>

          <div className='nav-right'>
            <ul>
              <li>
                <div className='dropdown'>
                  <select onChange={e => setYearTo(e.target.value)} value = {yearData && yearData.selected}>
                    {
                      // create 10 options
                      yearData &&
                      yearData.available &&
                      yearData.available.length > 0 &&
                      [...Array(yearData.available.length).keys()].map(i => {
                        
                        var val = <option value={yearData.available[i]} >{yearData.available[i]}</option>
                        if (yearData.selected == yearData.available[i]) {
                          val = <option value={yearData.available[i]} selected>{yearData.available[i]}</option>
                        }

                        return val
                      })
                      
                    }
                  </select>
                </div>
              </li>
              {generateAdminButtons()}
            </ul>
          </div>
          
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <FontAwesomeIcon icon={faWindowClose} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {

              if (isAdmin()) {
                if (item.title == 'Admin Login') {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.link}>
                        <div className='nav-icon'>
                          <FontAwesomeIcon icon={faSignOutAlt} />
                        </div>
                        <span onClick={logoutUserClick}>Logout</span>
                      </Link>
                    </li>
                  )
                }
              }

              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <div className='nav-icon'>
                      {item.icon}
                    </div>
                    <span onClick={() => handleClick(item.address)}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>

      {
        modalShowing &&
        <div className="modal-bg" onClick={() => setModalShowing(false)}>
        </div> 
      }
      
      <div className="modal-container">
          {/* CREATE TABLE MODAL */}
          {/* https://getbootstrap.com/docs/4.0/components/modal/ */}

        
            {
              isAdmin() &&
              showAddYearModal &&
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Add a New Year</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <input type="text" placeholder="Enter Year" onChange={e => setNewYearValue(e.target.value)} />
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddYearModal(false)}>CLOSE</Button>
                    <Button variant="primary" onClick={() => setSubmitAddYear(newYearValue)}>ADD</Button>
                  </Modal.Footer>
                </Modal.Dialog>
            }

            {
                isAdmin() &&
                showCreateTableModal &&
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Create a Table</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div>
                      <form onSubmit = {''}>
                          <div id = "inputLabel">
                              <label>
                                  Company Name:
                                  <input type = "text" value = {name} onChange = {e => setName(e.target.value)} />
                              </label>
                          </div>
                          <br />
                          <div id = "inputLabel">
                              <label>
                                  Number of Representatives:
                                  <input type = "text" value = {numReps} onChange = {e => setNumReps(e.target.value)} />
                              </label>
                          </div>
                          <br />
                          <div id = "inputLabel">
                              <label>
                                  Company Website:
                                  <input type = "text" value = {website} onChange = {e => setWebsite(e.target.value)} />
                              </label>
                          </div>
                          <br />
                          <div id = "inputLabel">
                              <label>
                                  Notes:
                                  <input type = "text" value = {notes} onChange = {e => setNotes(e.target.value)} />
                              </label>
                          </div>
                          <br />
                          <div id = "inputLabel">
                              <label>
                                  Company Logo:
                                  <input type = "file" />
                              </label>
                          </div>
                          <br />
                      </form>
                    </div>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateTableModal(false)}>CLOSE</Button>
                    <Button variant="primary" onClick = {submit()}>CREATE</Button>
                  </Modal.Footer>
                </Modal.Dialog>
            }
          
      </div>

    </>
  );
}

export default Navbar;