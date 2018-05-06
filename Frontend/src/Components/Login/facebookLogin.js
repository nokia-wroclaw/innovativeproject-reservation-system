import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'

import axios from 'axios'

class SiteFacebookLogin extends Component {

  responseFacebook = (response) => {
    console.log(response);
  }

  render() {
    return (
      <div>
        <FacebookLogin
          appId="422510151528330"
          autoLoad={true}
          fields="id, name,email"
          scope='public_profile,email'
          callback={this.responseFacebook}
          icon="fa-facebook"
        />
      <p onClick={this.handleFBlogout}>wyloguj</p>
      </div>
    );
  }

}

export default SiteFacebookLogin;
