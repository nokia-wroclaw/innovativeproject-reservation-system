import React, { Component } from 'react';

import AuthService from './AuthService'
import withAuth from './withAuth'

import {withRouter} from 'react-router-dom'

const Auth = new AuthService()

class Logout extends Component {
  componentWillMount() {
    if(!Auth.loggedIn()){
      this.props.history.replace('/')
    }
    Auth.logout()
    this.props.history.push('/')
  }
  render() {
    return (
      <div></div>
    );
  }

}

export default withRouter(withAuth(Logout));
