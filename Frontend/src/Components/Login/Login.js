import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import {withRouter} from 'react-router-dom'
import AuthService from '../AuthService'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Link} from 'react-router-dom'

//import NokiaLogoBlue from '../../images/NG_LOGOTYP_BASIC_NA_CIEMNYM_BEZ_TŁA_RGB.png'
import NokiaLogoBlue from '../../images/NG_LOGO_BEZ_CLAIMU_UPROSZCZONE_NA_BIAŁYM_RGB.png';

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formEmpty: false
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
    this.setState({
      formEmpty: false
    });
    if(this.state.email === '' || this.state.password === ''){
      this.setState({
        formEmpty: true
      });
    }
    else {
      this.Auth.login(this.state.email,this.state.password)
        .then(res =>{
           this.props.history.replace('/profile');
        })
        .catch(err =>{
           alert(err);
        })
    }
  }

  render() {
    return (
      <div>
        {this.state.formEmpty ? (
          <div className="login-error">
            <p style={{fontFamily: 'Helvetica, sans-serif'}}>Email or password is empty</p>
              </div>
            ) : (
              null
            )}
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionAppear={true}
              transitionAppearTimeout={1000}
              transitionEnter={false}
              transitionLeave={false}>
              <div style={{marginTop: '120px'}}>
                <div className="login-logo">
                  <img src={NokiaLogoBlue} alt='nokia logo' style={{width: '435px', height: '207px', marginTop: '-50px'}}/>
                </div>
                <div className="login-container">
                  <div className="login-form-wrapper">
                    <MuiThemeProvider>
                      <p className="login-input-helper" style={{marginTop: '-10px'}}>Enter email:</p>
                      <TextField
                        id="idloginemail"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        fullWidth={true}
                        underlineStyle={textFieldStyle.disabled}
                        underlineFocusStyle={textFieldStyle.focused}
                      />
                      <p className="login-input-helper">Enter password:</p>
                      <TextField
                        id="idloginpassword"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        fullWidth={true}
                        underlineStyle={textFieldStyle.disabled}
                        underlineFocusStyle={textFieldStyle.focused}
                        type="password"
                      />
                      <div className="login-actions">
                        <div className='login-forgot-password'>
                          <p>Forgot your password?</p>
                        </div>
                      <div className="login-button">
                      <RaisedButton
                        type='submit'
                        label='Sign in'
                        primary={true}
                        onClick={this.handleLogin}
                        fullWidth={true}
                      />
                  </div>
                  </div>
                    <div>
                      <div className="login-create-account-redirect">
                        <Link to="/register">Create account</Link>
                      </div>
                    </div>
                  </MuiThemeProvider>
                </div>
              </div>
              </div>
            </ReactCSSTransitionGroup>
            <footer className="login-footer">
              Nokia- Innovative project 2018- Nokia Garage
            </footer>
          </div>
    );
  }

}

export default withRouter(Login);
