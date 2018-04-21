import React, {Component} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ArduinoLogo from '../../../images/ArduinoAPP-01.svg'
import Description from './Description'

import arduino from '../../../images/arduino_mkr1000_front-1.jpg'

class DeviceDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis urna at libero mollis dignissim. Etiam tristique lectus sapien, id condimentum nisl facilisis sed. Etiam bibendum eros porttitor ex varius, nec scelerisque ligula vestibulum. Nam nibh justo, semper ut suscipit quis, consectetur at ipsum. Curabitur eget magna lectus. Morbi blandit est felis, non posuere lorem ultrices eget. Morbi orci sem.'
    };
  }

  componentDidMount() {
    axios.get(`/api/devices/${this.props.match.params.id}`)
    .then(res => {
      this.setState(res.data);
      console.log(res.data);
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
    console.log(this.props);
    return (
        <MuiThemeProvider>
          <Card style={{maxWidth: "80%", backgroundSize: "60% 100%, contain", margin: 'auto', padding: '3px'}}>
            <CardHeader
              title={this.state.name}
              subtitle={this.state.numLeft + " devices"}
              avatar={ArduinoLogo}
              showExpandableButton={true}
              actAsExpander={true}
            />
            <CardText expandable={true}>
              <Link to={`/devices/${this.state._id}/edit`} >Edit</Link>
            </CardText>
            <CardMedia
              overlay={<CardTitle title={this.state.name}/>}
            >
              <img src={arduino} alt={this.state.name} style={{backgroundSize: "75% 50% inherit", maxHeight: "500px", maxWidth: '500px'}}/>
            </CardMedia>
            <CardTitle title="Description" />
            <CardText>
            {this.state.toBeUpdated
              ? (
                <textarea rows="4" cols="100">
                  {this.state.description}
                </textarea>)
              : (<Description
                description={this.state.description}
              />)
            }
            </CardText>
          </Card>
        </MuiThemeProvider>
    )
  }
}

export default DeviceDetails;
