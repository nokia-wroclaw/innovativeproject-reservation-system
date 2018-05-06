
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

 const REGISTER_ROUTES = [{
   title: 'Sign in',
   to: '/login'
 }]

 class Navbar extends Component {
   render() {
     const TRANSPARENT_NAVBAR_ROUTES = ['/', '/login'];
     const isTransparentNavbarRoute = TRANSPARENT_NAVBAR_ROUTES.includes(this.props.location.pathname);
     const isMainRoute = this.props.location.pathname === '/';
     const navbarColorClass = isTransparentNavbarRoute ? '' : 'navbar-color';
     return (
      <div className={`navbar-container ${navbarColorClass}`}>
        <div className="navbar-content">
          <Link to="/"> <img src={nokiaLogo} alt='home page'/> </Link>
        <span className="spacing"/>
          <nav className="navbar">
            <ul className="navbar-items">
            {ROUTES.map(({to, title}, key) => (
                <NavLink to={to} key={key}>
                  <li>{title}</li>
                </NavLink>
              ))}
            </ul>
            <ul className="navbar-items-registration">
              {REGISTER_ROUTES.map(({to, title}, key) => (
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
