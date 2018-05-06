import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

//import DropZone from './Dropzones'

import axios from 'axios'

import LabelTextField from '../../LabelTextField'

import style from './Styles/DeviceStyles'
import '../../textFieldStyles.css'

const DEVICES_BASE_URL = '/api/devices';

class DeviceAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      numLeft: '',
      description: '',
      files: [],
      mainImage: '',
      isMainImageUploaded: false,
      data: [],
      addPage: true
    };
  }

  handleDeviceSubmit = (e) =>{
    e.preventDefault();
    console.log(this.state.mainImage);
    const device = {
      id: Date.now(),
      name: this.state.name,
      numLeft: this.state.numLeft,
      description: this.state.description,
    }
    axios.post(DEVICES_BASE_URL, device).then((result) => {
      this.props.history.push(`/devices/${result.data._id}`);
    })
  }


  handleDeviceNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleDeviceDescritionChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }

  handleDeviceNumLeftChange = (e) => {
    this.setState({
      numLeft: e.target.value
    });
  }

  handleMainImage = (image) => {

    //this.state.mainImage = image[0].preview
  }

  handleCancelClick = () => {
    this.props.history.push('/devices');
  }

  handleShowForm = () => {
    this.setState({
      addPage: false
    });
  }

  render() {
    return (
      <div style={style.container}>
        <h1 >Add new device to garage</h1>
        <MuiThemeProvider>
        <form onSubmit={this.handleDeviceSubmit} encType="multipart/form-data">
        <div>
        <List>
          <LabelTextField
            value={this.state.name}
            placeholder={'Enter device name'}
            onChange={this.handleDeviceNameChange}
            id={'devicename'}
            isLabelEnabled={true}
            position='left'
            label={'Enter device name'}
          />
          <LabelTextField
            value={this.state.numLeft}
            placeholder={'ex. 3...'}
            onChange={this.handleDeviceNumLeftChange}
            id={'numleft'}
            isLabelEnabled={true}
            label={'Enter number of available devices: '}
            position='left'
          />
          <ListItem
            primaryText='Enter device description'
            disabled={true}
          />
        <textarea rows='5' cols='50' onChange={this.handleDeviceDescritionChange}/>
        </List>
      </div>

        <RaisedButton
          primary={false}
          label='cancel'
          onClick={this.handleCancelClick}
          style={style.buttons}
        />
        <RaisedButton
          primary={true}
          label='submit'
          type='submit'
          style={style.buttons}
        />
        </form>
      </MuiThemeProvider>
      </div>
    );
  }

}

export default DeviceAdd;
