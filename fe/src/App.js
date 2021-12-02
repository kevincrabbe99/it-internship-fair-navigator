// import logo from './logo.svg';
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sideBar/Navbar.js';
import Map from './pages/map/Map';
import Login from './pages/login/Login';
import './App.css';
import ImageZoom from './components/panZoom/ImageZoom';

import { 
  BrowserRouter as Router,
  Route,
  Switch
  // Link
} from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import { YearContext } from './contexts/yearContext';

function App() { 

  const [user, setUser] = useState(null);
  const userProviderValue = useMemo(() => ({user, setUser}), [user, setUser]);

  const [yearData, setYearData] = useState(null);
  const yearDataProviderValue = useMemo(() => ({yearData, setYearData}), [yearData, setYearData]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('adminToken'));
    if (user !== null) {
      setUser(user)
    }
  }, [window])

  return (
    <UserContext.Provider value={userProviderValue}>
        <YearContext.Provider value={yearDataProviderValue}>
        <Router> 
          <div className="App">
            <Switch>
              <Route exact path="/" component={ImageZoom}/>
              <Route exact path="/login" component={Login}/>
              {/* <Route exact path="/admin" component={Admin} /> */}
            </Switch>
            <Sidebar />
          </div>
        </Router>
      </YearContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
