import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from '../images/add_thumbnail.png';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class DeviceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', numLeft: '' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumLeftChange = this.handleNumLeftChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddingButton = this.handleAddingButton.bind(this);
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleNumLeftChange(e) {
    this.setState({ numLeft: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let numLeft = this.state.numLeft.trim();
    if (!numLeft || !name) {
      return;
    }
    this.props.onDeviceSubmit({ name: name, numLeft: numLeft });
    this.setState({name: '', numLeft: '', toBeAdded: !this.state.toBeAdded});
  }

  handleAddingButton(e) {
    e.preventDefault();
    this.setState({toBeAdded: !this.state.toBeAdded});
  }
  render() {
    return (
      <MuiThemeProvider>
        {(!this.state.toBeAdded)
          ? (
            <List>
              <ListItem
                primaryText="Add new device"
                leftAvatar={<Avatar src={AddIcon} />}
                onClick={this.handleAddingButton}
                hoverColor='#ffffff'

              />
            </List>
      )
      :
      (
        <form onSubmit={ this.handleSubmit }>
        <MuiThemeProvider>
          <List>
            <ListItem  isKeyboardFocused='false' hoverColor='#b9ffff' >
            <TextField
            id ="name"
            floatingLabelText="Enter device name..."
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <TextField
            id ="numleft"
            floatingLabelText="Available devices.."
            value={this.state.numLeft}
            onChange={this.handleNumLeftChange}
          />
          <RaisedButton
            label="Submit"
            type="submit"
            primary={true}
            />
          <RaisedButton
            label="cancel"
            type="submit"
            primary={false}
            onClick={this.handleAddingButton}
          />
            </ListItem>
          </List>
        </MuiThemeProvider>
        </form>
      )
      }
      </MuiThemeProvider>
    )
  }
}

export default DeviceForm;
