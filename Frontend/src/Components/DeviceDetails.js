import React, {Component} from 'react'
import style from '../style'
import axios from 'axios';

class DeviceDetails extends Component {
  constructor(props){
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    axios.get(`/api/devices/${this.props.match.params.id}`)
    .then(res => {
      this.setState(res.data);
      console.log(res.data);
    })
  }
  render(){
    console.log(this.props);
    return (
        <div>
          <h4 style={style.deviceName}>{this.state.name}</h4>
          <hr/>
          <div style={this.state.numLeft > 0 ? style.available : style.unavailable}>
              {(this.state.numLeft > 0) ?
                (
                  <p>currently there are {this.state.numLeft} devices in lab</p>
                ) :
                (
                  <p>Device is currently unavailable </p>
                )}
          </div>
        </div>
    )
  }
}

export default DeviceDetails;
