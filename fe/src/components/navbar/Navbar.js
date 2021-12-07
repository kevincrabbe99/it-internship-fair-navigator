import React, { useState, useEffect, useContext, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { isAdmin, UserContext } from '../../contexts/userContext.js';
import { addNewYear, getTablesEndpoint, updateTableEndpoint } from '../../util/Endpoints.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { YearContext } from '../../contexts/yearContext.js';
import { structureYearState } from '../../contexts/yearContext.js';
import { getAvailableYears } from '../../util/Endpoints.js';
import { SidebarContext } from '../../contexts/sidebarContext.js';
import { createTableEndpoint } from '../../util/Endpoints.js';
import { MdAirlineSeatLegroomExtra } from 'react-icons/md';
import { arrow } from '@popperjs/core';
import { RoutesShowingContext } from '../../contexts/routesShowingContext';
import { MapContext } from '../../contexts/mapContext';
import { AddYearModalContext } from '../../contexts/addYearModalContext';
import { CreateTableModalContext } from '../../contexts/createTableModalContext';
import { ModalShowingContext } from '../../contexts/modalShowingContext';
import { useReactToPrint } from "react-to-print";
import Map from '../../pages/map/Map';
function Navbar() {

  const { user, setUser } = useContext(UserContext)

  const { sidebarState, setSidebarState } = useContext(SidebarContext)
  const { yearData, setYearData } = useContext(YearContext)
  const { routesShowingContext, setRoutesShowingContext } = useContext(RoutesShowingContext)
  const { mapContext, setMapContext } = useContext(MapContext)

  // const [sidebar, setSidebar] = useState(false);

  // const [modalShowing, setModalShowing] = useState(false);
  const {modalShowing, setModalShowing} = useContext(ModalShowingContext)
  // const [showAddYearModal, setShowAddYearModal] = useState(false);
  const {showAddYearModal, setShowAddYearModal} = useContext(AddYearModalContext)
  // const [createTableModal, setCreateTableModal] = useState(false);
  const {createTableModal, setCreateTableModal} = useContext(CreateTableModalContext)
  const [showPreview, setShowPreview] = useState(false);
  
  const [availableYears, setAvailableYears] = useState([]);
  const [newYearValue, setNewYearValue] = useState(null);
  const [submitAddYear, setSubmitAddYear] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);


  const [submitCreateMap, setSubmitCreateMap] = useState(false);
  const [tableId, setTableId] = useState('no_id');
 
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [cName, setName] = useState(null);
  const [numReps, setNumReps] = useState(null);
  const [website, setWebsite] = useState(null);
  const [notes, setNotes] = useState(null);
  const [logoFile, setLogo] = useState(null);


  const showSidebar = () => setSidebarState(!sidebarState);


  // for settings auto cords
  useEffect(() => {
    if(createTableModal && createTableModal.company) {
      setX(createTableModal.x_coord);
      setY(createTableModal.y_coord);
      setName(createTableModal.company.name);
      setNumReps(createTableModal.company.number_of_reps);
      setWebsite(createTableModal.company.website);
      setNotes(createTableModal.company.other_info);
      setLogo(createTableModal.imageUrl);
      setTableId(createTableModal._id);
      console.log("cre settings")
    } else {
      setX(null)
        setY(null)
        setName(null)
        setNumReps(null)
        setWebsite(null)
        setNotes(null)
        setLogo(null)
        setTableId(null)
    }
    console.log("setCreateTableModal", createTableModal)

  }, [createTableModal])

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
      setCreateTableModal(false)
    }

  }, [modalShowing])

  // for triggering the shader behind the modal
  useEffect(() => {
    if (showAddYearModal || createTableModal) {
      setModalShowing(true);
    } else {
      setModalShowing(false);
    }
  }, [showAddYearModal, createTableModal])



  const generateAdminButtons = () => {
    if (!isAdmin()) {
      return null;
    }  

    return ( 
    <>
      <li>
        <div className='button' onClick={() => setCreateTableModal(true)}> 
          MAKE TABLE
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

  const generateRoutesButton = () => {
    var label = "SHOW YOUR ROUTES"
    if (routesShowingContext.showing) {
      label = "HIDE ROUTES"
    } 

    return (
      <li>
        <div className='button' onClick={() => clickToggleRoute()}> 
          {label}
        </div>
      </li>
    )
  }

  const PrintMapButton = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
    content: () => componentRef.current
    });
    return (
      <div>
        <button
          type="button"
          class="button"
          onClick={handlePrint}
        >
          Print Map
        </button>
        {/* <h1 ref={componentRef}>HELLO?</h1> */}
        <div ref={componentRef}>
          <Map>
          </Map>
        </div> 
      </div>
    );
  };

  const clickToggleRoute = () => {
    setRoutesShowingContext({...routesShowingContext, showing: !routesShowingContext.showing}) 
  }

  const setYearTo = (val) => {
    setYearData(structureYearState(val, yearData.available))
  }



  

  useEffect(() => {
    async function makeTableAsyncWrapper(){
      console.log("async admin working");


      // const getTables = await getTablesEndpoint(user.uuid);
      // var response;
      // if(getTables.some(item => item.x_coord === x && item.y_coord === y)){
      //   var id = getTables.results.find(item => item.x_coord === x && item.y_coord === y);
      //   response = await updateTableEndpoint(user.uuid, id, x, y, cName, numReps, website, notes, '2021');
      // }
      // else{
      //   response = await createTableEndpoint(user.uuid, x, y, cName, numReps, website, notes, '2021');
      // }

      const response = await createTableEndpoint(user.uuid, x, y, cName, numReps, website, notes, yearData.selected, logoFile, tableId) 
      console.log("CREATE TABLE RESPONSE: ", response);
      setMapContext(response)
      setCreateTableModal(false)
    }
    console.log("async working", user);
    if(user && user.uuid && submitCreateMap){
      makeTableAsyncWrapper();
      setSubmitCreateMap(false);
    }
  }, [submitCreateMap])
  

  return (
    <>
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
              <div className="row">
                <div className="col-auto year-label">
                  YEAR: 
                </div>
                <div className="col-auto">
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
                </div>
              </div>
            </li>
            {PrintMapButton()} 
            {generateAdminButtons()}
            {generateRoutesButton()}
            </ul>
        </div>
        
      </div>

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
                createTableModal &&
                !showPreview &&
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Create a Table</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div>
                          <div>
                              <label>
                                  Company Name:
                                  <input type = "text" value = {cName} onChange = {e => setName(e.target.value)} />
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  Number of Representatives:
                                  <input type = "text" value = {numReps} onChange = {e => setNumReps(e.target.value)} />
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  Company Website:
                                  <input type = "text" value = {website} onChange = {e => setWebsite(e.target.value)} />
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  Notes:
                                  <input type = "text" value = {notes} onChange = {e => setNotes(e.target.value)} />
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  x-Coordinate:
                                  <input type = "text" value = {x} onChange = {e => setX(e.target.value)} />
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  y-Coordinate:
                                  <input type = "text" value = {y} onChange = {e => setY(e.target.value)} />
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  Company Logo:
                                  <input type = "text" value = {logoFile} onChange = {e => setLogo(e.target.value)}/>
                              </label>
                          </div>
                          <br />
                    </div>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setCreateTableModal(false)}>CLOSE</Button>
                    <Button variant="tertiary" onClick={() => setShowPreview(!showPreview)}>PREVIEW</Button>
                    <Button variant="primary" onClick = {() => setSubmitCreateMap(!submitCreateMap)}>SUBMIT</Button>
                  </Modal.Footer>
                </Modal.Dialog>
            }

            {
                isAdmin() &&
                createTableModal &&
                showPreview &&
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>View Table</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div>
                          <div>
                              <label>
                                  Company Name:
                                  <p>{cName}</p>
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  Number of Representatives:
                                  <p>{numReps}</p>
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  Company Website:
                                  <p>{website}</p>
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  Notes:
                                  <p>{notes}</p>
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  x-Coordinate:
                                  <p>{x}</p>
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  y-Coordinate:
                                  <p>{y}</p>
                              </label>
                          </div>
                          <br />
                          <div>
                              <label>
                                  Company Logo:
                                  <img src={logoFile} alt = 'Company Logo' width = '70' height = '70' />
                              </label>
                          </div>
                          <br />
                    </div>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setCreateTableModal(false)}>CLOSE</Button>
                    <Button variant="tertiary" onClick={() => setShowPreview(!showPreview)}>EDIT</Button>
                    <Button variant="primary" onClick = {() => setSubmitCreateMap(!submitCreateMap)}>SUBMIT</Button>
                  </Modal.Footer>
                </Modal.Dialog>
            }
          
      </div>

    </>
  );
}

export default Navbar;