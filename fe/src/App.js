// import logo from './logo.svg';
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sideBar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Map from './pages/map/Map';
import Login from './pages/login/Login';
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

function App() { 

  const [user, setUser] = useState(null);
  const userProviderValue = useMemo(() => ({user, setUser}), [user, setUser]);

  const [yearData, setYearData] = useState(null);
  const yearDataProviderValue = useMemo(() => ({yearData, setYearData}), [yearData, setYearData]);

  const [sidebarState, setSidebarState] = useState(false);
  const sidebarProviderValue = useMemo(() => ({sidebarState, setSidebarState}), [sidebarState, setSidebarState]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('adminToken'));
    console.log("Local storage token: ", u)
    if (u && u.uuid) {
      setUser(u)
    }
  }, [window])

  return (
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
  );
}

export default App;
