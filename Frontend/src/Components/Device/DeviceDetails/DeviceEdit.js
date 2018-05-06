import React , {Component} from 'react'
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dropzones from './Dropzones';

import LabelTextField from '../../LabelTextField'


import style from './Styles/DeviceStyles'

const DEVICES_BASE_URL = '/api/devices';

class DeviceEdit extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  handleDeviceEdit = (e) => {
    e.preventDefault();
    let id = this.state._id;
    let name = this.state.name;
    let numLeft = this.state.numLeft;
    let description = this.state.description;
    let device = {name: name, numLeft: numLeft, description: description}
    axios.put( `${DEVICES_BASE_URL}/${id}`, device )
    .then(result => {
      console.log(result.data);
      const index = this.state.data.findIndex(function(item) {
        return item._id === result.data._id;
      })
      const newData = [...this.state.data];
      newData[index] = result.data;
      this.setState({data: newData});
      this.props.history.push(`/devices/${id}`);
    })
    .catch(err => {
      console.error(err);
    })
  }

  componentDidMount() {
    axios.get(`${DEVICES_BASE_URL}/${this.props.match.params.id}`)
    .then(res => {
      this.setState(res.data);
      console.log(res.data);
    })
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  handleNumLeftChange = (e) => {
    this.setState({numLeft: e.target.value})
  }

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value})
  }

  render() {
    return (
      <div style={style.container}>
        <MuiThemeProvider>
        <form onSubmit={this.handleDeviceEdit}>
      <h1 style={style.title}>Device edit page</h1>
      <List>
        <LabelTextField
          value={this.state.name}
          placeholder={'Enter device name'}
          onChange={this.handleNameChange}
          id={'devicename'}
          isLabelEnabled={true}
          label={'Enter device name'}
          position='left'
        />
        <LabelTextField
          value={this.state.numLeft}
          placeholder={'ex. 3...'}
          onChange={this.handleNumLeftChange}
          id={'numleft'}
          isLabelEnabled={true}
          label={'Enter number of available devices: '}
          position='left'
        />
        <ListItem
          primaryText="enter device description here: "
          disabled={true}
        >
        </ListItem>

        <textarea rows="5" cols="50" placeholder='placeholder' maxLength='255' style={style.textArea} onChange={this.handleDescriptionChange}>
          {this.state.description}
        </textarea>

        <Dropzones />

        <ListItem
          disabled={true}
          style={{marginTop: '30px'}}
          rightIconButton={
            <RaisedButton
              label="Confirm"
              primary={true}
              type="submit"
            />
          }
        >
        </ListItem>
      </List>
    </form>
      </MuiThemeProvider>
    </div>
    )
  }
}

export default DeviceEdit;
