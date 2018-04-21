import React ,{Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';

import moment from 'moment'

class DataTextField extends Component {
  constructor(props){
    super(props);
    this.state= {
      disabled: false,
      hoverColor: '#ffffff',
    }

  }


  render() {

    return (
      <MuiThemeProvider>
        <List>
          <ListItem
            hoverColor={this.state.hoverColor}
            disabled={this.state.disabled}
            primaryText={'Start date: ' + moment(this.props.startDate).format("DD/MM/YYYY H:mm").valueOf()}
          >
          </ListItem>
        <ListItem
            hoverColor={this.state.hoverColor}
            disabled={this.state.disabled}
            primaryText={'End date: ' + moment(this.props.endDate).format("DD/MM/YYYY H:mm").valueOf()}
          >
          </ListItem>
        </List>
      </MuiThemeProvider>
    )
  }
}

export default DataTextField;
