import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ProfileSelectField extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: 'my profile'
    }
  }

  onLinkSelect = (e) => {
    this.setState({
      value: e.target.value
    });
  }



  render() {
    return (
      <div>
        <MuiThemeProvider>
          <SelectField
            value={this.state.value}
            onChange={this.onLinkSelect}
          >
          <MenuItem value={'MakerSpace'} primaryText="my profile" />
          <MenuItem value={'OpenSpace'} primaryText="my history" />
          <MenuItem value={'WholeSpace'} primaryText="logout" />
          </SelectField>
        </MuiThemeProvider>
      </div>
    );
  }

}

export default ProfileSelectField;
