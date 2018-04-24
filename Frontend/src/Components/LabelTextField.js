import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'

import './Common/textfield.css'

const textFieldStyle = {
  focused: {
    borderColor: 'rgba(0,0,0,0.5)',
  },
  disabled: {
    borderColor: 'black',
  },
  textStyle: {
    color: '#424242'
  }
}

class LabelTextField extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className="text-field-label-container">
            {this.props.isLabelEnabled
              ? (<div>
                  <p className="label-div">{this.props.label}</p>
                </div>)
              : (null)}
            <div className="text-field-div">
              <TextField
                id={"id" + this.props.id}
                placeholder={this.props.placeholder}
                underlineStyle={textFieldStyle.disabled}
                underlineFocusStyle={textFieldStyle.focused}
                inputStyle={textFieldStyle.textStyle}
                value={this.props.value}
                onChange={this.props.onChange}
              >
              </TextField>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

}

export default LabelTextField;
