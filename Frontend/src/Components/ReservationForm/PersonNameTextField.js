import React ,{Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';

class PersonNameTextField extends Component {
  constructor(props){
    super(props);
    this.state= {
      personName: '',
      disabled: true,
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
            disabled={this.state.disabled}
            primaryText="Enter your name: "
            rightIconButton={
              <TextField
                id="formPersonName"
                placeholder="ex. John Smith"
                onChange={this.props.onChangePersonName}
                value={this.props.personName}
              />
            }
          >
          </ListItem>
        </List>
      </MuiThemeProvider>
    )
  }
}

export default PersonNameTextField;
