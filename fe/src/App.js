// import logo from './logo.svg';
import Header from './components/header/Header';
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
        <Switch>
          <Route exact path="/" component={Map}/>
          {/* <Route exact path="/admin" component={Admin} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
