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
import { RoutesContext } from './contexts/routesContext';
import { MapContext } from './contexts/mapContext';
function App() { 

  const [user, setUser] = useState(null);
  const userProviderValue = useMemo(() => ({user, setUser}), [user, setUser]);

  const [yearData, setYearData] = useState(null);
  const yearDataProviderValue = useMemo(() => ({yearData, setYearData}), [yearData, setYearData]);

  const [sidebarState, setSidebarState] = useState(false);
  const sidebarProviderValue = useMemo(() => ({sidebarState, setSidebarState}), [sidebarState, setSidebarState]);

  const [routesContext, setRoutesContext] = useState([]);
  const routesProviderValue = useMemo(() => ({routesContext, setRoutesContext}), [routesContext, setRoutesContext]);

  const [mapContext, setMapContext] = useState(null);
  const mapProviderValue = useMemo(() => ({mapContext, setMapContext}), [mapContext, setMapContext]);


  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('adminToken'));
    if (u && u.uuid) {
      setUser(u)
    }
  }, [window])

  return (
    <MapContext.Provider value={mapProviderValue}>
      <RoutesContext.Provider value={routesProviderValue}>
        <SidebarContext.Provider value={sidebarProviderValue}>
          <UserContext.Provider value={userProviderValue}>
              <YearContext.Provider value={yearDataProviderValue}>
              <Router> 
                <div className="App">
                  <Switch>
                    <Route exact path="/" component={Map}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/feedback" component={Feedback}/> 
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
                  <Sidebar />
                </div>
              </Router>
            </YearContext.Provider>
          </UserContext.Provider>
        </SidebarContext.Provider>
      </RoutesContext.Provider>
    </MapContext.Provider>
  );
}

export default App;
