import React, { Component } from 'react';
import LabelTextField from '../LabelTextField'
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import TextField from 'material-ui/TextField'

import {Link, withRouter} from 'react-router-dom'

import SiteFacebookLogin from './facebookLogin'

import NokiaLogoBlue from '../../images/nokia-logo.jpg'


import '../HomePage/HomePage.css'
import './login.css'

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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      samePassword: true,
      checked: false,
      uncheckedError: false,
      successReservation: false,
      emailTakenError: false
    };
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
  handlePasswordConfirmChange = (e) => {
    this.setState({
      passwordConfirm: e.target.value
    });
  }
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleRegistration = () => {
    this.setState({
      samePassword: true,
      uncheckedError: false,
      emailTakenError: false,
    });
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    if(this.state.password !== this.state.passwordConfirm){
      this.setState({
        passwordConfirm: '',
        samePassword: false
      });
    }
    else{
      if(!this.state.checked){
        this.setState({
          uncheckedError: true
        });
      }else {
          axios.post('/api/users',newUser)
            .then((result)=>{
              if(result.data.error){
                this.setState({
                  emailTakenError: true
                });
              }
              else {
                this.setState({
                  email: '',
                  password: '',
                  checked: false,
                  uncheckedError: false,
                  successReservation: true
                });
              }
            })
          }
      }
  }

  updateCheck = () => {
    this.setState({
      checked: !this.state.checked
    })
  }

  gotoPrivacy =() => {
    this.props.history.push('/privacy')
  }

  render() {
    return (
      <div>
        <div className="login-logo">
          <img src={NokiaLogoBlue} alt='nokia logo' style={{marginTop:'-50px'}}/>
          <p className="login-sign-up">Sign up</p>
        </div>
        <div className="login-container">
            <div className="login-form-wrapper">
              {this.state.successReservation === false
                ? (
                  <div>
                    {this.state.samePassword ? (null) : (<p style={{color: 'red'}}>Not same password</p>)}
                    {this.state.emailTakenError ? (<p style={{color: 'red'}}>Email already taken</p>) : (null)}
                    <MuiThemeProvider>
                    <p className="login-input-helper">Enter your name:</p>
                    <TextField
                      value={this.state.name}
                      onChange={this.handleNameChange}
                      fullWidth={true}
                      underlineStyle={textFieldStyle.disabled}
                      underlineFocusStyle={textFieldStyle.focused}
                    />
                  <p className="login-input-helper">Enter your email:</p>
                    <TextField
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      fullWidth={true}
                      underlineStyle={textFieldStyle.disabled}
                      underlineFocusStyle={textFieldStyle.focused}
                    />
                  <p className="login-input-helper">Enter your password:</p>
                    <TextField
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      fullWidth={true}
                      underlineStyle={textFieldStyle.disabled}
                      underlineFocusStyle={textFieldStyle.focused}
                      type="password"
                    />
                  <p className="login-input-helper">Confirm your password:</p>
                      <TextField
                        value={this.state.passwordConfirm}
                        onChange={this.handlePasswordConfirmChange}
                        fullWidth={true}
                        underlineStyle={textFieldStyle.disabled}
                        underlineFocusStyle={textFieldStyle.focused}
                        type="password"
                      />
                      {this.state.uncheckedError ? (<p style={{color: 'red'}}>error: unchecked</p>) : (null)}
                      <Checkbox
                        labelStyle={{zIndex: '3'}}
                        label={(
                            <label onClick={this.gotoPrivacy}>
                                I agree with privacy
                            </label>
                          )}
                        checked={this.state.checked}
                        onCheck={this.updateCheck.bind(this)}
                        style={{marginLeft: '30px', position: 'relative'}}
                        >
                      </Checkbox>
                      <RaisedButton
                        label='Register'
                        type='submit'
                        primary={true}
                        style={{float: 'right', marginTop: '20px', marginRight: '25px'}}
                        onClick={this.handleRegistration}
                      />
                      </MuiThemeProvider>
                      <div>
                        <div className="login-create-account-redirect">
                          <Link to="/login">Already have an account? Sign in.</Link>
                        </div>
                      </div>
                  </div>
                ) : (
                  <div>
                    <p style={{padding: '2px', fontWeight: 'bold', textAlign: 'center'}}>
                      Your account has been succesfully registered. Please confirm it.
                    </p>
                    <p className="login-create-account-redirect">Not received an email? Click here.</p>
                  </div>
                )}
            </div>
        </div>
      </div>
    );
  }

}

export default withRouter(Register);
