import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

import DropZone from './Dropzones'
import request from 'superagent'

import {Redirect} from 'react-router-dom'
import axios from 'axios'

import LabelTextField from '../../LabelTextField'

import style from './Styles/DeviceStyles'
import '../../textFieldStyles.css'

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
      redirect: false,
      addPage: true
    };
  }

  handleDeviceSubmit = (e) =>{
    console.log(this.state.mainImage);
    const device = {
      id: Date.now(),
      name: this.state.name,
      numLeft: this.state.numLeft,
      description: this.state.description,
    }
    axios.post('http://localhost:3001/api/devices',  device).then(() => {
      this.setState({
        redirect: true
      });
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
    const reader = new FileReader();
    this.state.mainImage = image[0].preview
  }

  handleCancelClick = () => {
    this.setState({
      redirect: true
    });
  }

  handleShowForm = () => {
    this.setState({
      addPage: false
    });
  }

  render() {
    if(this.state.redirect){
      return <Redirect to='/devices'/>
    }
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
            label={'Enter device name'}
          />
          <LabelTextField
            value={this.state.numLeft}
            placeholder={'ex. 3...'}
            onChange={this.handleDeviceNumLeftChange}
            id={'numleft'}
            isLabelEnabled={true}
            label={'Enter number of available devices: '}
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
