import React ,{Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';

class NumOfPeopleTextField extends Component {
  constructor(props){
    super(props);
    this.state= {
      personName: '',
      disabled: 'false',
      hoverColor: '#ffffff',
    }

    //this.handleNumOfPeopleChange = this.handleNumOfPeopleChange.bind(this);
  }

  //handleNumOfPeopleChange (e){
  //  this.setState({numOfPeople: e.target.value})
  //}

  render() {
    return (
      <MuiThemeProvider>
        <List>
          <ListItem
            hoverColor={this.state.hoverColor}
            disabled={this.state.disabled}
            primaryText="Enter your name: "
            rightIconButton={
              <TextField
                id="formPersonName"
                placeholder="ex. John Smith"
                onChange={this.props.onChangePersonName}
                numOfPeople={this.props.personName}
              />
            }
          >
          </ListItem>
        </List>
      </MuiThemeProvider>
    )
  }
}

export default NumOfPeopleTextField;
