import React from 'react';
import ReactDOM from 'react-dom';
import HomeComponent from './Components/HomeComponent';


import './main.css';
import dotenv from 'dotenv'

import {
  BrowserRouter as Router,
} from 'react-router-dom';

dotenv.config('../')

ReactDOM.render(
  <Router>
    <HomeComponent />
  </Router>
   ,document.getElementById('root')
);
