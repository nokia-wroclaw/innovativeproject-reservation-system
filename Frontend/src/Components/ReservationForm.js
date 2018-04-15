import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class ReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: '', endDate: '', NumOfPeople: '', Options: '' };
    this.handlestartDateChange = this.handlestartDateChange.bind(this);
    this.handleendDateChange = this.handleendDateChange.bind(this);
    this.handleNumOfPeopleChange = this.handleNumOfPeopleChange.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlestartDateChange(e) {
    this.setState({ startDate: e.target.value });
  }
  handleendDateChange(e) {
    this.setState({endDate: e.target.value})
  }
  handleNumOfPeopleChange(e) {
    this.setState({ NumOfPeople: e.target.value });
  }
handleOptionsChange(e) {
  this.setState( {Options: e.target.value })
}

  handleSubmit(e) {
    e.preventDefault();
    let startDate = this.state.startDate.trim();
    let endDate = this.state.endDate.trim();
    let NumOfPeople = this.state.NumOfPeople.trim();
    let Options =this.state.Options.trim();
    if (!NumOfPeople || !startDate || !endDate || !Options) {
      return;
    }
    this.props.onReservationSubmit({ startDate: startDate,endDate: endDate, numOfPeople: NumOfPeople, option: Options });
    this.setState({startDate: '', endDate: '', NumOfPeople: '', Options: ''});
  }
  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
      <MuiThemeProvider>
        <TextField
          id ="startDate"
          floatingLabelText="Enter startDate Reservation"
          value={this.state.startDate}
          onChange={this.handlestartDateChange}
        />
        <TextField
          id ="endDate"
          floatingLabelText="Enter endDate Reservation"
          value={this.state.endDate}
          onChange={this.handleendDateChange}
        />
        <TextField
          id ="NumOfPeople"
          floatingLabelText="Enterrrr NumOfPeople"
          value={this.state.NumOfPeople}
          onChange={this.handleNumOfPeopleChange}
        />
        <TextField
          id ="Options"
          floatingLabelText="Options"
          value={this.state.Options}
          onChange={this.handleOptionsChange}
        />
        <RaisedButton
          label="Submit"
          type="submit"
          primary={true}
        />
      </MuiThemeProvider>
      </form>
    )
  }
}

export default ReservationForm;
