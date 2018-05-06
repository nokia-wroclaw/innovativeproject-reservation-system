import React, { Component } from 'react';
import LabelTextField from './LabelTextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import AuthService from './AuthService'

import './HomePage/HomePage.css'
import './Register.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.Auth = new AuthService()
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  componentDidMount() {
      if(this.Auth.loggedIn())
       this.props.history.replace('/');
  }

  handleLogin = () => {
    this.Auth.login(this.state.email,this.state.password)
      .then(res =>{
         this.props.history.replace('/profile');
      })
      .catch(err =>{
         alert(err);
      })
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-image">
          <div className="form-container">
              <LabelTextField
                id="loginEmail"
                isLabelEnabled={true}
                label='Enter your email'
                value={this.state.email}
                onChange={this.handleEmailChange}
                placeholder='ex@domain.com'
                position='top'
              />
              <LabelTextField
                id="loginpassword"
                isLabelEnabled={true}
                label='Enter your password'
                value={this.state.password}
                onChange={this.handlePasswordChange}
                isPassword={true}
                position='top'
              />
              <MuiThemeProvider>
                <RaisedButton
                  label='Login'
                  type='submit'
                  primary={true}
                  style={{float: 'right', marginTop: '20px', marginRight: '25px'}}
                  onClick={this.handleLogin}
                />
                </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(Login);
