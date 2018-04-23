import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import nokiaLogo from '../../images/nokia-logo.png';

import './Navbar.css';

const ROUTES = [{
  title: 'reservation',
  to: '/reservation'
}, {
  title: 'devices',
  to: '/devices'
}];

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <Link to="/"> <img src={nokiaLogo}/> </Link>
        <span className="spacing"/>
        <nav className="navbar">
          <ul className="navbar-items">
            {ROUTES.map(({to, title}, key) => (
              <Link to={to} key={key}>
                <li>{title}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
