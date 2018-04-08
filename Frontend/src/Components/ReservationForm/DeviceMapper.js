import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios'

class DeviceMapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      numLeft: '',
      data: [],
    }
  }
  static defaultProps = {ata: []};

  componentDidMount() {
    axios.get('/api/devices')
      .then(res => {
        this.setState({data: res.data});
      })
  }

  render() {
    console.log(this.props);
      return (
        <div>
          <MuiThemeProvider>
            <List>
              <ListItem>
                qwertyuiop
              </ListItem>
            </List>
          </MuiThemeProvider>
        </div>
      )
    }
}

export default DeviceMapper;
