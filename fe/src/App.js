// import logo from './logo.svg';
import React from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sideBar/Navbar.js';
import Map from './pages/map/Map';
import './App.css';

import { 
  BrowserRouter as Router,
  Route,
  Switch
  // Link
} from 'react-router-dom';

function App() {
  return (
    <Router> 
      <div className="App">
        <Header/>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Map}/>
          {/* <Route exact path="/admin" component={Admin} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
