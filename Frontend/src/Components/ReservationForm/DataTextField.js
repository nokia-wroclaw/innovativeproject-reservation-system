import React ,{Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';

class DataTextField extends Component {
  constructor(props){
    super(props);
    this.state= {
      disabled: 'false',
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
            primaryText={'Start date: ' + this.props.startDate }

          >
          </ListItem>
        <ListItem
            hoverColor={this.state.hoverColor}
            disabled={this.state.disabled}
            primaryText={"End Date: "+ this.props.endDate }
          >
          </ListItem>
        </List>
      </MuiThemeProvider>
    )
  }
}

export default DataTextField;
