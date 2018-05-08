import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'

import './facebookLogin.css';

class SiteFacebookLogin extends Component {

  responseFacebook = (response) => {
    console.log(response);
  }

  render() {
    return (
      <div className="facebook-login-container">
        <FacebookLogin
          className="facebook-login-button"
          appId="422510151528330"
          autoLoad={true}
          fields="id, name,email"
          scope='public_profile,email'
          callback={this.responseFacebook}
          icon="fa-facebook"
        />
      </div>
    );
  }

}

export default SiteFacebookLogin;
