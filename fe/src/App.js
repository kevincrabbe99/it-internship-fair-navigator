// import logo from './logo.svg';
import React, { useState, useMemo } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sideBar/Navbar.js';
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

function App() { 

  const [user, setUser] = useState(null);
  const userProviderValue = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <UserContext.Provider value={userProviderValue}>
      <Router> 
        <div className="App">
          <Header/>
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Map}/>
            <Route exact path="/login" component={Login}/>
            {/* <Route exact path="/admin" component={Admin} /> */}
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
