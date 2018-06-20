import React, {Component} from 'react'
import axios from 'axios'
import DeviceList from './DeviceList';
import style from '../../style';

import {withRouter} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'

import withAuth from '../withAuth';

const DEVICES_BASE_URL = '/api/devices';

class DeviceBlock extends Component {
  constructor(props){
    super(props);
    this.state = {data: [], redirectAdd: false, addFormOpen: true};
    this.loadDeviceFromServer = this.loadDeviceFromServer.bind(this);
    this.handleDeviceDelete = this.handleDeviceDelete.bind(this);
    this.handleDeviceEdit = this.handleDeviceEdit.bind(this);
  }

  loadDeviceFromServer() {
    axios.get(DEVICES_BASE_URL)
      .then(res => {
        this.setState({data: res.data});
      })
  }

  handleDeviceDelete(id) {
    axios.delete(`${DEVICES_BASE_URL}/${id}`)
      .then(res => {
        let devices = this.state.data.filter((item) => item._id !== id )
          this.setState({data: devices});
      })
      .catch(err => {
        console.error(err);
      });
    }

    handleDeviceEdit(id, device) {
      axios.put( `${DEVICES_BASE_URL}/${id}`, device )
      .then(result => {
        const index = this.state.data.findIndex(function(item) {
          return item._id === result.data._id;
        })
        const newData = [...this.state.data];
        newData[index] = result.data;
        this.setState({data: newData});
      })
      .catch(err => {
        console.error(err);
      })
    }

  componentDidMount() {
    this.loadDeviceFromServer();
  }

  redirectToAddingPage = () => {
    this.props.history.push('/devices/add');
  }

  handleAddFormOpen = (e) => {
    this.setState({
      addFormOpen: !this.state.addFormOpen
    });
  }

  render() {
    return (
        <div style={style.deviceBox}>
          <h3 style={style.title}>Devices:</h3>
          {this.props.user.sub[3] === true
            ? (
              <MuiThemeProvider>
                  <List>
                    <ListItem
                      primaryText="Click to add new device..."
                      onClick={this.redirectToAddingPage}
                      style={{backgroundColor: 'rgb(213, 232, 241)'}}
                    >
                    </ListItem>
                  </List>
                </MuiThemeProvider>
            ) : (
              null)}
        <DeviceList
          onDeviceDelete = {this.handleDeviceDelete}
          onDeviceEdit={this.handleDeviceEdit}
          data={this.state.data}
          renderType='deviceList'
        />
        </div>
    )
  }
}

export default withRouter(withAuth(DeviceBlock));
