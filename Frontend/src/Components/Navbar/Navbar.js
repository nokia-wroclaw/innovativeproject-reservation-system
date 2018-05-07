import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import nokiaLogo from '../../images/nokia-logo.png';

import {NOT_LOGGED_IN_ROUTES, LOGGED_IN_ROUTES, REGISTER_ROUTES, LOGOUT_ROUTE} from '../../routes'
import AuthService from '../AuthService';
import withAuth from '../withAuth';

 import './Navbar.css';

 const Auth = new AuthService();

 class Navbar extends Component {
   render() {
     console.log(Auth.loggedIn());
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
            {Auth.loggedIn() === false ? (
              <div>
                <ul className="navbar-items">
              {NOT_LOGGED_IN_ROUTES.map(({to, title}, key) => (
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
              </div>
            ) : (
              <div>
                <ul className="navbar-items">
                {LOGGED_IN_ROUTES.map(({to, title}, key) => (
                    <NavLink to={to} key={key}>
                      <li>{title}</li>
                    </NavLink>
                  ))}
                </ul>
                <ul className="navbar-items-registration">
                {LOGOUT_ROUTE.map(({to, title}, key) => (
                    <NavLink to={to} key={key}>
                      <li>{title}</li>
                    </NavLink>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </div>
       </div>
     );
   }
 }

export default withRouter(Navbar);
