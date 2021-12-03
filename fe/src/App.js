// import logo from './logo.svg';
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sideBar/Navbar.js';
import Map from './pages/map/Map';
import Login from './pages/login/Login';
import Checklist from './pages/files/Checklist';
import Worksheet from './pages/files/Worksheet';
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

function App() { 

  const [user, setUser] = useState(null);
  const userProviderValue = useMemo(() => ({user, setUser}), [user, setUser]);

  const [yearData, setYearData] = useState(null);
  const yearDataProviderValue = useMemo(() => ({yearData, setYearData}), [yearData, setYearData]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('adminToken'));
    if (u && u.uuid) {
      setUser(user)
    }
  }, [window])

  return (
    <UserContext.Provider value={userProviderValue}>
        <YearContext.Provider value={yearDataProviderValue}>
        <Router> 
          <div className="App">
            <Switch>
              <Route exact path="/" component={Map}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/feedback" component={Feedback}/> 
              <Route exact path="/checklist" component={Checklist}/>
              <Route exact path="/worksheet" component={Worksheet}/>
            </Switch>
            <Sidebar />
          </div>
        </Router>
      </YearContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
