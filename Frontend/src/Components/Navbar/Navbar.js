import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import nokiaLogo from '../../images/nokia-logo.png';

import AuthService from '../AuthService';

import './Navbar.css';

const ROUTES = [{
  title: 'reservation',
  to: '/reservation',
  auth: true,
  itemClassName: ''
}, {
  title: 'devices',
  to: '/devices',
  auth: true,
  itemClassName: ''

}, {
  title: 'profile',
  to: '/profile',
  auth: true,
  itemClassName: ''
}, {
//   title: 'about',
//   to: '/about',
//   auth: false,
//   itemClassName: ''
// }, {
  title: 'Sign in',
  to: '/login',
  auth: false,
  itemClassName: 'auth-item'
}, {
  title: 'Sign up',
  to: 'register',
  auth: false,
  itemClassName: 'auth-item'
}, {
  title: 'logout',
  to: '/logout',
  auth: true,
  itemClassName: 'auth-item'
}];

const Auth = new AuthService();

class Navbar extends Component {
  renderRoutes() {
    return ROUTES
      .filter(({auth}) => auth === Auth.loggedIn())
      .map(({to, title, itemClassName}, key) => (
        <NavLink to={to} key={key} className={itemClassName}>
          <li>{title}</li>
        </NavLink>
      ));
  }

  render() {
    const TRANSPARENT_NAVBAR_ROUTES = ['/', '/login'];
    const isTransparentNavbarRoute = TRANSPARENT_NAVBAR_ROUTES.includes(this.props.location.pathname);
    const navbarColorClass = isTransparentNavbarRoute ? '' : 'navbar-color';
    return (
      <div className={`navbar-container ${navbarColorClass}`}>
        <div className="navbar-content">
          <Link to="/"> <img src={nokiaLogo} alt='home page'/> </Link>
          <span className="spacing"/>
          <nav className="navbar">
            <ul className="navbar-items">
              {this.renderRoutes()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
