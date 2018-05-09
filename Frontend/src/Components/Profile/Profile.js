import React, { Component } from 'react';
import BlankProfile from '../../images/blank-profile.png'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import withAuth from '../withAuth'

import axios from 'axios'
import {USER_BASE_URL} from '../../routes'


import './profile.css'

const textFieldStyle = {
  focused: {
    borderColor: 'rgba(0,0,0,0.5)',
  },
  disabled: {
    borderColor: 'black',
  },
  textStyle: {
    color: '#424242'
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      buttonChangePasswordDisabled: true,
    };
  }

  componentDidMount() {
    axios.get(`${USER_BASE_URL}/${this.props.user.sub[0]}`)
    .then(res=>{
      this.setState({
        username: res.data.local.name,
        email: res.data.local.email,
        oldpassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      });
    })
  }



  handleOldPasswordChange = (e) => {
    this.setState({
      oldpassword: e.target.value
    });
  }

  handleNewPasswordChange = (e) => {
    this.setState({
      newPassword:e.target.value
    });
  }

  handleNewConfirmPasswordChange = (e) => {
    this.setState({
      newPasswordConfirm:e.target.value
    });
  }

  handlePasswordChangeSubmit = () => {
    /*const passwords = {
      oldpassword: this.state.oldpassword,
      newPassword: this.state.newPassword
    }*/
  }

  render() {
    return (
      <div>
        <div className="profile-card-wrapper">
          <div className="profile-profile-card">
            <div className="profile-profile-info">
              <div style={{textAlign: 'center', marginTop: '10px'}}>
                <img src={BlankProfile} alt="user thumbnail" style={{maxWidth: '270px', maxHeight: '270px'}}/>
              </div>
              <div className="profile-list-data-left">
                <ul className="profile-ul-data">
                  <li>
                    <p className="profile-data-list-name">Name: </p>
                  </li>
                  <li>
                    <p className="profile-data-list-name">Email: </p>
                  </li>
                </ul>
              </div>
              <div className="profile-list-data-right">
                <ul className="profile-ul-data">
                  <li>
                    <p className="profile-data-list-userdata">{this.state.username}</p>
                  </li>
                  <li>
                    <p className="profile-data-list-userdata">{this.state.email}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="profile-right-side">
              <div className="profile-additional-links">
                <ul className='profile-additional-links-ul'>
                  <li className='profile-additional-links-li'>
                    Change password
                  </li>
                  <li className='profile-additional-links-li'>
                    My reservations
                  </li>
                </ul>
              </div>
              <div className="profile-right-side-info">
                <p style={{color: '#504543', fontWeight: 'bold'}}>Change your password</p>
                <MuiThemeProvider>
                  <p>Enter your old password: </p>
                    <TextField
                      id="idoldpasswordchange"
                      value={this.state.oldpassword}
                      type="password"
                      onChange={this.handleOldPasswordChange}
                      underlineStyle={textFieldStyle.disabled}
                      underlineFocusStyle={textFieldStyle.focused}
                      style={{marginTop: '-15px'}}
                    />
                  <p>Enter your new password</p>
                    <TextField
                      id="idnewpasswordchange"
                      value={this.state.newPassword}
                      type="password"
                      onChange={this.handleNewPasswordChange}
                      underlineStyle={textFieldStyle.disabled}
                      underlineFocusStyle={textFieldStyle.focused}
                      style={{marginTop: '-15px'}}
                    />
                  <p>Confirm your new password</p>
                    <TextField
                      id="idmewpasswordconfirmchange"
                      value={this.state.newPasswordConfirm}
                      type="password"
                      onChange={this.handleNewConfirmPasswordChange}
                      underlineStyle={textFieldStyle.disabled}
                      underlineFocusStyle={textFieldStyle.focused}
                      style={{marginTop: '-15px'}}
                    />
                  <RaisedButton
                    label="change password"
                    type="submit"
                    primary={true}
                    style={{marginLeft: '20px'}}
                    onClick={this.handlePasswordChangeSubmit}
                    disabled={this.state.buttonChangePasswordDisabled}
                  />
                </MuiThemeProvider>
              </div>
            </div>
          </div>
          </div>
      </div>
    );
  }

}

export default withAuth(Profile);
