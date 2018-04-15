import React ,{Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SelectRoomField extends Component {
  constructor(props){
    super(props);
    this.state ={
      disabled: 'true',
      primaryText: 'Select room:',
    }
    //this.handleSelectFieldChangeChange = this.handleSelectFieldChangeChange.bind(this);
  }

  //handleSelectFieldChangeChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
      <MuiThemeProvider>
        <List>
          <ListItem
            disabled={this.state.disabled}
            primaryText={this.state.primaryText}

            rightIconButton={
              <SelectField
                  value={this.props.value}
                  onChange={this.props.onRoomSelectChange}
                >
                <MenuItem value={'MakerSpace'} primaryText="Maker Space" />
                <MenuItem value={'OpenSpace'} primaryText="Open Space" />
                <MenuItem value={'Lab'} primaryText="Lab" />
                <MenuItem value={'WholeSpace'} primaryText="Whole space" />
              </SelectField>
            }
          />
        </List>
      </MuiThemeProvider>
      </div>
    )
  }
}

export default SelectRoomField;
