import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import LabelTextFields from './LabelTextField';
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
    console.log(this.state.startDate);
    return (
      <form onSubmit={ this.handleSubmit }>
      <MuiThemeProvider>
        <LabelTextFields
          id={"startDate"}
          isLabelEnabled={true}
          label={"enter starting date for reservation:"}
          placeholder={"Enter start date"}
          value={this.state.startDate}
          onChange={this.handlestartDateChange}
        />
        <LabelTextFields
          id={"endDate"}
          isLabelEnabled={true}
          label={"enter ending date for reservation:"}
          placeholder={"Enter end date"}
          value={this.state.endDate}
          onChange={this.handleendDateChange}
        />
        <LabelTextFields
          id={"numOfPeople"}
          isLabelEnabled={true}
          label={"enter num of people:"}
          placeholder={"Enter num of people"}
          value={this.state.NumOfPeople}
          onChange={this.handleNumOfPeopleChange}
        />
        <LabelTextFields
          id={"option"}
          isLabelEnabled={false}
          label={"enter option:"}
          placeholder={"ex. whole space"}
          value={this.state.option}
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
