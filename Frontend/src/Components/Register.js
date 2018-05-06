import React, { Component } from 'react';
import LabelTextField from './LabelTextField'
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'

import SiteFacebookLogin from './Login/facebookLogin'

import './HomePage/HomePage.css'
import './Register.css'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checked: false,
      uncheckedError: false,
      successReservation: false
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

  handleRegistration = () => {
    const newUser = {
      email: this.state.email,
      password: this.state.password
    }
    if(this.state.checked === true){
        axios.post('/api/users',newUser)
        .then(()=>{
          this.setState({
            email: '',
            password: '',
            checked: false,
            uncheckedError: false,
            successReservation: true
          });
        })
    }
    else {
      this.setState({
        uncheckedError: true
      });
    }
  }

  updateCheck() {
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-image">
          <div className="form-container">
            {this.state.successReservation === false
              ? (
                <div>
                  <LabelTextField
                    id="registerEmail"
                    isLabelEnabled={true}
                    label='Enter your email'
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder='ex@domain.com'
                    position='top'
                  />
                  <LabelTextField
                    id="registerpassword"
                    isLabelEnabled={true}
                    label='Enter your password'
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    isPassword={true}
                    position='top'
                  />
                  <MuiThemeProvider>
                    {this.state.uncheckedError ? (<p style={{color: 'red'}}>error: unchecked</p>) : (null)}
                    <Checkbox
                      label="Agree with licence"
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
                    <SiteFacebookLogin/>
                </div>
              ) : (
                <div>
                  <p>Your account has been succesfully registered</p>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }

}

export default Register;
