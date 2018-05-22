import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {Link, withRouter} from 'react-router-dom'

import NokiaLogoBlue from '../../images/NG_LOGO_BEZ_CLAIMU_UPROSZCZONE_NA_BIAŁYM_RGB.png'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import '../HomePage/HomePage.css'
import './register.css'
import './login.css'

const textFieldStyle = {
  focused: {
    borderColor: 'rgb(0, 38, 62)',
  },
  disabled: {
    borderColor: 'rgba(0, 38, 62, .5)',
  },
  textStyle: {
    color: '#424242'
  }
}

const RegisterTextField = ({id, value, onChange}) => (
  <div>
    <MuiThemeProvider>
      <TextField
        id={id}
        value={value}
        onChange={onChange}
        underlineStyle={textFieldStyle.disabled}
        underlineFocusStyle={textFieldStyle.focused}
        style={{width: '90%'}}
      />
    </MuiThemeProvider>
  </div>
);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      phonenumber: '',
      name: '',
      lastname: '',
      organization: '',
      value: 'individual',
      samePassword: true,
      checked: false,
      uncheckedError: false,
      successReservation: false,
      emailTakenError: false,
      btnDisabled: false
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

  handleOrganizationChange = (e) => {
    this.setState({
      organization: e.target.value
    });
  }

  handlephonenumberchange = (e) => {
    this.setState({
      phonenumber: e.target.value
    });
  }

  onOriginSelectChange = (event, index, value) => {
    this.setState({value});
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

  handleLastNameChange = (e) => {
    this.setState({
      lastname: e.target.value
    });
  }

handleRegistration = () => {
  this.setState({samePassword: true, uncheckedError: false, emailTakenError: false, btnDisabled: true});
  const newUser = {
    name: this.state.name,
    lastname: this.state.lastname,
    email: this.state.email,
    organization: this.state.organization,
    phonenumber: this.state.phonenumber,
    password: this.state.password,
    origin: this.state.value
  }
  console.log(newUser);
  axios.post('/api/users', newUser).then((result) => {
    if (result.data.error) {
      this.setState({emailTakenError: true, btnDisabled: false});
    } else {
      this.setState({
        email: '',
        password: '',
        checked: false,
        uncheckedError: false,
        successReservation: true,
        btnDisabled: false
      });
    }
  })
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
        {this.state.successReservation === false
        ? (
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeave={false}>
          <div className="register-form-container">
            <div className="register-form-form">
              <div className="register-form-title">
                Sign up
              </div>
              <MuiThemeProvider>
                <div className="register-form-row">
                  <p className="register-input-helper">Enter first name:</p>
                  <div className="register-input">
                    <RegisterTextField
                      propvalue={this.state.name}
                      onChange={this.handleNameChange}
                    />
                  </div>
                <p className="register-input-helper">Enter last name:</p>
                <div className="register-input">
                  <RegisterTextField
                    propvalue={this.state.lastname}
                    onChange={this.handleLastNameChange}
                  />
                </div>
                </div>
                <div className="register-form-row">
                  <p className="register-input-helper">Enter email:</p>
                  <div className="register-input">
                    <RegisterTextField
                      propvalue={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </div>
                  <p className="register-input-helper" >Enter phone number:</p>
                  <div className="register-input">
                    <RegisterTextField
                      propvalue={this.state.phonenumber}
                      onChange={this.handlephonenumberchange}
                    />
                  </div>
                </div>
                <div className="register-form-row">
                  <p className="register-input-helper">Enter organization:</p>
                  <div className="register-input">
                    <RegisterTextField
                      propvalue={this.state.organization}
                      onChange={this.handleOrganizationChange}
                    />
                  </div>
                  <p className="register-input-helper" >Select your group:</p>
                  <div className="register-input" >
                    <SelectField
                        value={this.state.value}
                        onChange={this.onOriginSelectChange}
                        style={{width: 'inherit', marginLeft: '10px'}}
                        autoWidth={false}
                      >
                      <MenuItem value={'individual'} primaryText="INDIVIDUAL" style={{textAlign: 'center'}}/>
                      <MenuItem value={'startup'} primaryText="STARTUP"  style={{textAlign: 'center'}}/>
                      <MenuItem value={'company'} primaryText="COMPANY"  style={{textAlign: 'center'}}/>
                      <MenuItem value={'other'} primaryText="OTHER"  style={{textAlign: 'center'}}/>
                    </SelectField>
                  </div>
                </div>
                <div className="register-form-row" style={{marginTop: '-10px', marginBottom: '15px'}}>
                  <p className="register-input-helper">Enter password:</p>
                  <div className="register-input">
                    <TextField
                      id="idregisterpassword"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      underlineStyle={textFieldStyle.disabled}
                      underlineFocusStyle={textFieldStyle.focused}
                      type="password"
                      style={{width: '90%'}}
                    />
                  </div>
                  <p className="register-input-helper">Confirm password:</p>
                  <div className="register-input">
                    <TextField
                      id="idregisterpasswordconfirm"
                      value={this.state.passwordConfirm}
                      onChange={this.handlePasswordConfirmChange}
                      underlineStyle={textFieldStyle.disabled}
                      underlineFocusStyle={textFieldStyle.focused}
                      type="password"
                      style={{width: '90%'}}
                    />
                  </div>
                </div>
                <div className="register-input-helper">
                  <Checkbox
                    labelStyle={{zIndex: '3'}}
                    style={{marginBottom: '10px'}}
                    label={(
                      <div>
                        <label>I agree with </label>
                        <label onClick={this.gotoPrivacy} style={{color: 'blue', cursor: 'pointer'}}>
                          terms of use and privacy
                        </label>
                      </div>
                    )}
                    checked={this.state.checked}
                    onCheck={this.updateCheck.bind(this)}
                    style={{marginLeft: '30px', position: 'relative', marginBottom: '15px'}}
                  />
                </div>
              <RaisedButton
                type="submit"
                label="register"
                onClick={this.handleRegistration}
                fullWidth={true}
                primary={true}
                buttonStyle={{background: 'rgb(0, 38, 62)'}}
              />
              </MuiThemeProvider>
              <div className="login-create-account-redirect">
                  <Link to="/login">Already have an account? Sign in.</Link>
              </div>
            </div>
            <div className="register-form-image">
              <img src={NokiaLogoBlue} alt="nokia-garage-logo" style={{width:  '435px', height: "207px", marginTop: 'auto', marginBottom: 'auto' }}/>
            </div>
          </div>
      </ReactCSSTransitionGroup>
        ) : (
          <div className='login-form-wrapper'>
            <p style={{padding: '2px', fontWeight: 'bold', textAlign: 'center'}}>
                Your account has been succesfully registered. Please confirm it.
              </p>
              <p className="login-create-account-redirect">Not received an email? Click here.</p>
              <p className="login-create-account-redirect">
                <Link to='/login'>Redirect to login page</Link>
              </p>
          </div>
        )}
      </div>
    );
  }

}

export default withRouter(Register);
