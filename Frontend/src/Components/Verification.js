import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Verification extends Component {
  constructor(props){
    super(props)
    this.state = {
      query: ''
    }
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.setState({
      query: this.props.match.params.id
    });
    console.log(this.state.query);
    axios.get(`http://localhost:3001/api/users/verify/${this.props.match.params.id}`)
    .then(()=>{console.log('success');})
    .catch(err => {
      console.log('error');
    })
  }



  render() {
    return (
      <div>
        Your account is now verified! 
      </div>
    );
  }

}

export default withRouter(Verification);
