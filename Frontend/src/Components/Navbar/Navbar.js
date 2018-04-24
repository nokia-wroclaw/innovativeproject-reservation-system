
import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
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
    const isMainRoute = this.props.location.pathname === '/';
    const navbarColorClass = isMainRoute ? '' : 'navbar-color';
     return (
      <div className={`navbar-container ${navbarColorClass}`}>
        <div className="navbar-content">
          <Link to="/"> <img src={nokiaLogo}/> </Link>
        <span className="spacing"/>
          <nav className="navbar">
            <ul className="navbar-items">
            {ROUTES.map(({to, title}, key) => (
                <NavLink to={to} key={key}>
                  <li>{title}</li>
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
       </div>
     );
   }
 }

export default withRouter(Navbar);
