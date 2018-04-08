import React from 'react';
import ReactDOM from 'react-dom';
import HomeComponent from './Components/HomeComponent';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <HomeComponent />
  </Router>
   ,document.getElementById('root')
);
