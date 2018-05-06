import React, {Component} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

//import ArduinoLogo from '../../../images/ArduinoAPP-01.svg'
import placeholder from '../../../images/placeholder_thumbnail.png'
import big_placeholder from '../../../images/big_image.png'
//import arduino from '../../../images/arduino_mkr1000_front-1.jpg'

const DEVICES_BASE_URL = '/api/devices';

class DeviceDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.get(`${DEVICES_BASE_URL}/${this.props.match.params.id}`)
      .then(res => {
        this.setState(res.data);
        console.log("+" + res.data);
      })
  }

  handleDescriptionEditDevice = () => {
    this.setState({toBeUpdated: !this.state.toBeUpdated})
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  handleNumLeftChange = (e) => {
    this.setState({numLeft: e.target.value})
  }


  render(){
    return (
        <MuiThemeProvider>
          <Card style={{backgroundSize: "60% 100%, contain", margin: 'auto', padding: '3px'}}>
                  <CardHeader
                    title={this.state.name}
                    subtitle={this.state.numLeft + " devices"}
                    avatar={placeholder}
                    showExpandableButton={true}
                    actAsExpander={true}
                  />
                  <CardText expandable={true}>
                    <Link to={`/devices/${this.state._id}/edit`}>Edit</Link>
                  </CardText>
                  <CardMedia
                    overlay={<CardTitle title={this.state.name}/>}
                  >
                    <img src={big_placeholder} alt={this.state.name}
                         style={{backgroundSize: "75% 50% inherit", maxHeight: "500px", maxWidth: '500px'}}/>
                  </CardMedia>
                  <CardTitle title="Description"/>
                  <CardText >
                    {this.state.description}
                  </CardText>
                </Card>
        </MuiThemeProvider>
    )
  }
}

export default DeviceDetails;
