import React, { Component } from 'react';
import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      testbool: false
    }
  }

  handleLogout = () =>{
   Auth.logout()
   this.props.history.replace('/login');
  }

  render() {
    console.log(this.props.user.sub[3]);
    return (
      <div>
        User email: {this.props.user.sub[1]} <br/>
        User name: {this.props.user.sub[2]} <br/>
      {this.props.user.sub[3] === true
        ? (
          <p>User is admin</p>
        ) : (
          <p style={{color: 'orange'}}>User is NOT an admin</p>
        )
      }
      <p onClick={this.handleLogout}>logout</p>
     </div>
    );
  }

}

export default withAuth(Profile);
