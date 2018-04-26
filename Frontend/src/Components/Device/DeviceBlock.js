import React, {Component} from 'react'
import axios from 'axios'
import DeviceList from './DeviceList';
import style from '../../style';

import {Redirect} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'

class DeviceBlock extends Component {
  constructor(props){
    super(props);
    this.state = {data: [], redirectAdd: false, addFormOpen: true};
    this.loadDeviceFromServer = this.loadDeviceFromServer.bind(this);
    this.handleDeviceDelete = this.handleDeviceDelete.bind(this);
    this.handleDeviceEdit = this.handleDeviceEdit.bind(this);
  }

  loadDeviceFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({data: res.data});
      })
  }

  handleDeviceDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        let devices = this.state.data.filter((item) => item._id !== id )
          this.setState({data: devices});
        console.log('device deleted');
      })
      .catch(err => {
        console.error(err);
      });
    }

    handleDeviceEdit(id, device) {
      axios.put( `${this.props.url}/${id}`, device )
      .then(result => {
        console.log(result.data);
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

  componentWillUnmount() {
  }

  redirectToAddingPage = () => {
    this.setState({
      redirectAdd: true
    });
  }

  handleAddFormOpen = (e) => {
    this.setState({
      addFormOpen: !this.state.addFormOpen
    });
  }

  render() {
    if(this.state.redirectAdd){
        return <Redirect to={`/devices/add`}/>
    }
    return (
        <div style={style.deviceBox}>
          <h3 style={style.title}>Devices:</h3>
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
        <DeviceList
          onDeviceDelete = {this.handleDeviceDelete}
          onDeviceEdit={this.handleDeviceEdit}
          data={this.state.data}>
        </DeviceList>
        </div>
    )
  }
}

export default DeviceBlock;