import React ,{Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';

class NumOfPeopleTextField extends Component {
  constructor(props){
    super(props);
    this.state= {
      numOfPeople: '',
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
            primaryText="Enter number of people: "
            rightIconButton={
              <TextField
                id="formNumOfPeople"
                placeholder="ex. 3"
                onChange={this.props.onChangeNumOfPeople}
                value={this.props.numOfPeople}
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
