import React, { Component } from 'react';
import LabelTextField from './LabelTextField'
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'

import {Link, withRouter} from 'react-router-dom'

import SiteFacebookLogin from './Login/facebookLogin'

import './HomePage/HomePage.css'
import './Register.css'

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
      uncheckedError: false
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
      <div className="header-container">
        <div className="header-image">
          <div className="form-container">
            {this.state.successReservation === false
              ? (
                <div>
                  {this.state.samePassword ? (null) : (<p style={{color: 'red'}}>Not same password</p>)}
                  <LabelTextField
                    id="registerEmail"
                    isLabelEnabled={true}
                    label='Enter your email'
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder='ex@domain.com'
                    position='left'
                  />
                  <LabelTextField
                    id="registerName"
                    isLabelEnabled={true}
                    label='Enter your name'
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    placeholder='ex.. John Smith'
                    position='left'
                  />
                  <LabelTextField
                    id="registerpassword"
                    isLabelEnabled={true}
                    label='Enter your password'
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    isPassword={true}
                    position='left'
                  />
                  <LabelTextField
                    id="registerconfirmpassword"
                    isLabelEnabled={true}
                    label='Confirm your password'
                    value={this.state.passwordConfirm}
                    onChange={this.handlePasswordConfirmChange}
                    isPassword={true}
                    position='left'
                  />
                  <MuiThemeProvider>
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
                </div>
              ) : (
                <div>
                  <p style={{padding: '2px'}}>Your account has been succesfully registered</p>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(Register);
