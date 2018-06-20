import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import BlankProfile from '../../../images/tools.png'
import TextField from 'material-ui/TextField'

//import DropZone from './Dropzones'

import axios from 'axios'

import '../../textFieldStyles.css'

import './Styles/deviceadd.css'

const DEVICES_BASE_URL = '/api/devices';

const textFieldStyle = {
  focused: {
    borderColor: 'rgba(0,0,0,0.5)',
  },
  disabled: {
    borderColor: 'black',
  },
  textStyle: {
    color: '#424242'
  }
}

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
    console.log(this.state.filepath);
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
      <div>
        <h1 style={{textAlign: 'center', fontSize: '30px', marginTop: '15px', marginBotton: '15px'}}>Add new device to Nokia Garage</h1>
        <div className="profile-card-wrapper">
          <div className="profile-profile-card">
            <div className="profile-profile-info">
              <div style={{textAlign: 'center', marginTop: '10px'}}>
                <img src={BlankProfile} alt="user thumbnail" style={{maxWidth: '270px', maxHeight: '270px'}}/>
              </div>
            </div>
            <div className="profile-right-side">
              <div className="profile-additional-links">
                <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '18px', color: '#504543'}}>Enter new device data:</p>
              </div>
              <div className="profile-right-side-info">
              <form enctype="multipart/form-data" onSubmit={this.handleDeviceSubmit}>
                <MuiThemeProvider>
                  <p className="device-label">Enter new device name: </p>
                  <TextField
                    placeholder="ex. 3D printer"
                    value={this.state.name}
                    onChange={this.handleDeviceNameChange}
                    underlineStyle={textFieldStyle.disabled}
                    underlineFocusStyle={textFieldStyle.focused}
                    style={{marginLeft: '370px'}}
                  />
                <p  className="device-label">Enter number of available devices:</p>
                  <TextField
                    placeholder="ex. 3"
                    value={this.state.numLeft}
                    underlineStyle={textFieldStyle.disabled}
                    underlineFocusStyle={textFieldStyle.focused}
                    onChange={this.handleDeviceNumLeftChange}
                    style={{marginLeft: '370px'}}
                  />
                <p>Add device description:</p>
                  <textarea rows="4" cols="65" className="textarea" onChange={this.handleDeviceDescritionChange}/>
                  <RaisedButton
                    label="Add device"
                    type="submit"
                    primary={true}
                    style={{marginLeft: '20px'}}
                  />
                </MuiThemeProvider>
                </form>
              </div>
            </div>
          </div>
          </div>
      </div>
    );
  }

}

export default DeviceAdd;
