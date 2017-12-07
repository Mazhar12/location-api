import React from'react';
import ReactDOM from'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../style.css';

import getNinjas from './getNinjas.js';
import searchNinjas from './searchNinjas.js';
import addNinjas from './addNinja.js';

const App = () => (
      <Router>
        <div>
             <ul className='header'>
                <li className='headerItem'><Link to="/">Search Ninjas</Link></li>
                <li className='headerItem'><Link to="/add">add Ninja</Link></li>
                <li className='headerItem'><Link to="/get">get Ninjas</Link></li>
            </ul>

             <hr />
          <Route exact path='/' component={searchNinjas} />
          <Route path='/add' component={addNinjas} />
          <Route path='/get' component={getNinjas} />
        </div>
      </Router>
        
);
      ReactDOM.render(<App />, document.getElementById('ninjas'));

    