import React, { Component } from 'react';
import AuthService from '../AuthService';
import withAuth from '../withAuth';
import { NavLink, Link, withRouter } from 'react-router-dom';

//import {DASHBOARD_ROUTES} from '../../routes'
import './dashboard.css'

const Auth = new AuthService();

const DASHBOARD_ROUTES = [{
  title: 'My reservations',
  to: '/myreservations'
},{
  title: 'My profile',
  to: '/profile'
}, {
  title: 'Edit profile',
  to: '/profile/edit'
}]


class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      testbool: false,
    }
  }

  handleLogout = () =>{
   Auth.logout()
   this.props.history.replace('/login');
  }

  render() {
    console.log('work in progress');
    return (
      <div className="profile-container">
        <div className="profile-upper-block">
          <div className="left-side-menu">
            <ul className="profile-links">
            {DASHBOARD_ROUTES.map(({to, title}, key) => (
                <NavLink to={to} key={key}>
                  <li>{title}</li>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="profile-data">
            {this.props.user.sub[1]} <br/>
            {this.props.user.sub[2]}
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(withAuth(Profile));
