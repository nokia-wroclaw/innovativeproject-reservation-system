import React, { Component } from 'react';
import AuthService from '../AuthService';
import withAuth from '../withAuth';
import './profile.css'

const Auth = new AuthService();

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
              <li>Profile</li>
              <li>Reservation history</li>
              <li>Edit profile data </li>
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

export default withAuth(Profile);
