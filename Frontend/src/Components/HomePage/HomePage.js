import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Navbar from '../Navbar/Navbar';

import './HomePage.css';

class HomePage extends Component {

  render() {
    return (
      <div>
        <div className="header-container">
          <div className="header-image"/>
          <div className="header-title">
            <h1 className="title primary-title">Welcome to Nokia Garage</h1>
            <h2 className="title secondary-title">Let's change the world together</h2>
            <Link to="/"><span className="join-button">Join now</span></Link>
          </div>
        </div>
        <Navbar/>
      </div>
    );
  }

}

export default HomePage;
