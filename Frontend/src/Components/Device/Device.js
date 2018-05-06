import React, { Component } from 'react'
import style from '../../style'

import placeholder from '../../images/placeholder_thumbnail.png';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';


import Avatar from 'material-ui/Avatar';

import { Link, withRouter } from 'react-router-dom';

import './DeviceDetails/Styles/deviceStyles.css'


class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      toBeDeleted: false,
      toBeAdded: true,
      name: '',
      numLeft: '',
      description: '',
      deviceCount: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumLeftChange = this.handleNumLeftChange.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
    this.editDevice = this.editDevice.bind(this);
    this.handleEditDevice = this.handleEditDevice.bind(this);
    this.cancelEditDevice = this.cancelEditDevice.bind(this);
  }

  deleteDevice(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onDeviceDelete(id);
    console.log('deleted');
  }

  editDevice(e) {
    e.preventDefault();
    this.props.history.push(`/devices/${this.props.uniqueID}/edit`);
  }

  handleEditDevice(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    let name = (this.state.name) ? this.state.name : null;
    let numLeft = (this.state.numLeft) ? this.state.numLeft : null;
    let device = {name: name, numLeft: numLeft};
    this.props.onDeviceEdit(id, device);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      name: '',
      numLeft: ''
    })
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  handleNumLeftChange(e) {
    this.setState({numLeft: e.target.value})
  }

  cancelEditDevice(e) {
    e.preventDefault();
    this.setState({toBeUpdated: !this.state.toBeUpdated});
  }

  stopEventPropagation(event) {
    event.preventDefault();
  }

  countDevices = () => {

  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <List>
            <Link to={`/devices/${this.props.uniqueID}`} style={style.link}>
              <ListItem
                primaryText={this.props.name}
                leftAvatar={<Avatar src={placeholder}/>}
                rightIconButton={
                  <IconMenu
                    onClick={this.stopEventPropagation}
                    iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                  >
                    <MenuItem leftIcon={<EditIcon/>} primaryText="Edit" onClick={this.editDevice}/>
                    <MenuItem primaryText="Delete" leftIcon={<DeleteIcon/>} onClick={this.deleteDevice}/>
                  </IconMenu>
                }
              />
            </Link>
            <Divider/>
          </List>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withRouter(Device);
