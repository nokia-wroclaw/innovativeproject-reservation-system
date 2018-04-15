import React , {Component} from 'react'
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class DeviceEdit extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      description: '',
      redirect: false
    }
  }

  handleDeviceEdit = (e) => {
    e.preventDefault();
    let id = this.state._id;
    let name = this.state.name;
    let numLeft = this.state.numLeft;

    let device = {name: name, numLeft: numLeft}
    axios.put( `/api/devices/${id}`, device )
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
    this.setState({redirect: true})
  }

  componentDidMount() {
    axios.get(`/api/devices/${this.props.match.params.id}`)
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

  render() {
    if(this.state.redirect){
      return <Redirect to={`/devices/${this.state._id}`}/>
    }
    return (
      <MuiThemeProvider>
      <h1>Device edit page</h1>
      <List>
        <ListItem
          disabled={true}
          primaryText="Change device name"
          rightIconButton={
              <TextField
                id="editDeviceName"
                value={this.state.name}
                onChange={this.handleNameChange}
                placeholder={this.state.name}
              />
          }
        >
        </ListItem>
        <ListItem
          disabled={true}
          primaryText="Change number of available devices"
          rightIconButton={
            <TextField
              id="editDeviceNumLeft"
              value={this.state.numLeft}
              onChange={this.handleNumLeftChange}
              placeholder={this.state.numLeft}
            />
          }
        >
        </ListItem>
        <ListItem
          primaryText="enter device description here: "
          disabled={true}
          rightIconButton={
            <textarea rows="4" cols="100">
              {this.state.description}
            </textarea>
          }
        >
        </ListItem>
        <ListItem
          disabled={true}
          style={{marginTop: '30px'}}
          rightIconButton={
            <RaisedButton
              label="Confirm"
              primary={true}
              type="submit"
              onClick={this.handleDeviceEdit}
            />
          }
        >
        </ListItem>
      </List>
      </MuiThemeProvider>
    )
  }
}

export default DeviceEdit;
