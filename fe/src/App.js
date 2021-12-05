// import logo from './logo.svg';
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sideBar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Map from './pages/map/Map';
import Login from './pages/login/Login';
import Subscribe from './pages/subscribe/Subscribe';
import Unsubscribe from './pages/unsubscribe/Unsubscribe';

import './App.css';

import { 
  BrowserRouter as Router,
  Route,
  Switch
  // Link
} from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import { YearContext } from './contexts/yearContext';
import Feedback from './pages/feedback/Feedback';
import { SidebarContext } from './contexts/sidebarContext';
import { RoutesShowingContext } from './contexts/routesShowingContext';
import { MapContext } from './contexts/mapContext';
import { CreateTableModalContext } from './contexts/createTableModalContext';
import { AddYearModalContext } from './contexts/addYearModalContext';
import { ModalShowingContext } from './contexts/modalShowingContext';
import { TableMatrixContext } from './contexts/tableMatrixContext';
import { RoutesDataContext } from './contexts/routesDataContext';
import RoutesView from './components/Routes/RoutesView';

function App() { 

  const [user, setUser] = useState(null);
  const userProviderValue = useMemo(() => ({user, setUser}), [user, setUser]);

  const [yearData, setYearData] = useState(null);
  const yearDataProviderValue = useMemo(() => ({yearData, setYearData}), [yearData, setYearData]);

  const [sidebarState, setSidebarState] = useState(false);
  const sidebarProviderValue = useMemo(() => ({sidebarState, setSidebarState}), [sidebarState, setSidebarState]);

  const [routesShowingContext, setRoutesShowingContext] = useState([]);
  const routesProviderValue = useMemo(() => ({routesShowingContext, setRoutesShowingContext}), [routesShowingContext, setRoutesShowingContext]);

  const [mapContext, setMapContext] = useState(null);
  const mapProviderValue = useMemo(() => ({mapContext, setMapContext}), [mapContext, setMapContext]);

  const [createTableModal, setCreateTableModal] = useState(false);
  const createTableModalProviderValue = useMemo(() => ({createTableModal, setCreateTableModal}), [createTableModal, setCreateTableModal]);

  const [showAddYearModal, setShowAddYearModal] = useState(false);
  const addYearModalProviderValue = useMemo(() => ({showAddYearModal, setShowAddYearModal}), [showAddYearModal, setShowAddYearModal]);

  const [modalShowing, setModalShowing] = useState(false);
  const modalShowingProviderValue = useMemo(() => ({modalShowing, setModalShowing}), [modalShowing, setModalShowing]);

  const [tableMatrix, setTableMatrix] = useState([...Array(15)].map(e => Array(15)));
  const tableMatrixProviderValue = useMemo(() => ({tableMatrix, setTableMatrix}), [tableMatrix, setTableMatrix]);

  const [routesData, setRoutesData] = useState([]);
  const routesDataProviderValue = useMemo(() => ({routesData, setRoutesData}), [routesData, setRoutesData]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('adminToken'));
    if (u && u.uuid) {
      setUser(u)
    }
  }, [window])

  return (
  <RoutesDataContext.Provider value={routesDataProviderValue}>
    <TableMatrixContext.Provider value={tableMatrixProviderValue}>
      <ModalShowingContext.Provider value={modalShowingProviderValue}>
        <AddYearModalContext.Provider value={addYearModalProviderValue}>
          <CreateTableModalContext.Provider value={createTableModalProviderValue}>
            <MapContext.Provider value={mapProviderValue}>
              <RoutesShowingContext.Provider value={routesProviderValue}>
                <SidebarContext.Provider value={sidebarProviderValue}>
                  <UserContext.Provider value={userProviderValue}>
                      <YearContext.Provider value={yearDataProviderValue}>
                      <Router> 
                        <div className="App">
                          <Switch>
                            <Route exact path="/" component={Map}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/feedback" component={Feedback}/> 
                            <Route exact path="/subscribe" component={Subscribe}/> 
                            <Route exact path="/unsubscribe" component={Unsubscribe}/>
                            <Route path='/checklist' component={() => { 
                              window.location.href = "./Internship Fair Checklist.pdf"; 
                              return null;
                            }}/>
                            <Route path='/worksheet' component={() => { 
                                window.location.href = "./Internship Fair Preparation Worksheet.pdf"; 
                                return null;
                            }}/>
                          </Switch>
                          <Navbar/>
                          <RoutesView/>
                          <Sidebar />
                        </div>
                      </Router>
                    </YearContext.Provider>
                  </UserContext.Provider>
                </SidebarContext.Provider>
              </RoutesShowingContext.Provider>
            </MapContext.Provider>
          </CreateTableModalContext.Provider>
        </AddYearModalContext.Provider>
      </ModalShowingContext.Provider>
    </TableMatrixContext.Provider>
  </RoutesDataContext.Provider>
  );
}

export default App;
