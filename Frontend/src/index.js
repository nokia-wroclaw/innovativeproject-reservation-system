import React from 'react';
import ReactDOM from 'react-dom';
import HomeComponent from './Components/HomeComponent';

import './main.css';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <HomeComponent />
  </Router>
   ,document.getElementById('root')
);
