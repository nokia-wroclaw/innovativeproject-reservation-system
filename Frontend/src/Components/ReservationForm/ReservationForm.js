import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import NumOfPeopleTextField from './NumOfPeopleTextField'
import SelectRoomField from './SelectRoomField';
import DeviceTable from './DeviceTable';
import {Link} from 'react-router-dom';
import DataTextField from './DataTextField'
import {List, ListItem} from 'material-ui/List';
import PersonNameTextField from './PersonNameTextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';


class ReservationForm2 extends Component {
  constructor(props){
    super(props);
    this.state ={
      deviceData: [],
      value: 'WholeSpace',
      startDate: '',
      endDate: '',
      numOfPeople: '',
      open: false,
      personName: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumOfPeopleChange = this.handleNumOfPeopleChange.bind(this);
    this.handleSelectRoomChange = this.handleSelectRoomChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let numOfPeople = this.state.numOfPeople.trim();
    let option = this.state.value;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    let personName = this.state.personName;
    this.props.onReservationSubmit({ numOfPeople: numOfPeople,
                                    option: option,
                                    startDate: startDate,
                                    endDate: endDate,
                                    personName: personName});
    this.setState({numOfPeople: '', option: ''});
  }

  handleNumOfPeopleChange  (e) {
    this.setState({numOfPeople: e.target.value});
  }

  handleSelectRoomChange(event, index, value) {
    this.setState({value});
  }

  handlePersonNameChange(e){
    this.setState({personName: e.target.value})
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.onRenderChange}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];
    return (
      <MuiThemeProvider>
        <Dialog
          title="Reservation form"
          modal={false}
          actions={actions}
          open={!this.props.showCalendar}
          onRequestClose={this.handleClose}
        >
        <form onSubmit={this.handleSubmit}>
          <SelectRoomField
            value={this.state.value}
            onRoomSelectChange={this.handleSelectRoomChange}
          />
          <NumOfPeopleTextField
            numOfPeople={this.state.numOfPeople}
            onChangeNumOfPeople={this.handleNumOfPeopleChange}
          />
          <PersonNameTextField
            personName={this.state.personName}
            onChangePersonName={this.handlePersonNameChange.bind(this)}
          />
          <DeviceTable
            onFormOpen={this.state.deviceData}
          />
        </form>
        </Dialog>
        </MuiThemeProvider>
    )
  }
}

export default ReservationForm2;
