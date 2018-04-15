import React, {Component} from 'react'
import style from '../style'
import edit_logo from '../images/editlogo.png';
import delete_logo from '../images/deletelogo.png';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Reservation extends Component {
  constructor(props){
    super(props);
    this.state = {
      toBeUpdated: false,
      toBeDeleted: false,
      startDate: '',
      endDate: '',
      numOfPeople: '',
      options: '',
    };

    this.handlestartDateChange = this.handlestartDateChange.bind(this);
    this.handleendDateChange = this.handleendDateChange.bind(this);
    this.handleNumOfPeopleChange = this.handleNumOfPeopleChange.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.deleteReservation = this.deleteReservation.bind(this);
    this.editReservation = this.editReservation.bind(this);
    this.handleEditReservation = this.handleEditReservation.bind(this);
    this.cancelEditReservation = this.cancelEditReservation.bind(this);
  }

  deleteReservation(e) {
    e.preventDefault();
    this.setState({toBeUpdated: !this.state.toBeUpdated})
    let id = this.props.uniqueID;
    this.props.onReservationDelete(id);
    console.log('deleted');
  }

  editReservation(e) {
    e.preventDefault()
    this.setState({toBeUpdated: !this.state.toBeUpdated});
  }

  handleEditReservation(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    let startDate = (this.state.startDate) ? this.state.startDate : null;
    let endDate = (this.state.endDate) ? this.state.endDate : null;
    let NumOfPeople = (this.state.NumOfPeople) ? this.state.numOfPeople : null;
    let Options = (this.state.Options) ? this.state.options : null;
    let reservation = { startDate:  startDate, endDate: endDate, numOfPeople: NumOfPeople, option: Options};
    this.props.onReservationEdit(id, reservation);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      startDate: '',
      endDate: '',
      NumOfPeople: '',
      Options: ''
    })
  }

  handlestartDateChange(e) {
    this.setState({startDate: e.target.value})
  }
  handleendDateChange(e) {
    this.setState({endDate: e.target.value})
  }

  handleNumOfPeopleChange(e) {
    this.setState({numOfPeople: e.target.value})
  }
  handleOptionsChange(e) {
    this.setState({options: e.target.value})
  }

  cancelEditReservation(e) {
    e.preventDefault();
    this.setState({toBeUpdated: !this.state.toBeUpdated});
  }

  render() {
    return (
      <div style={style.reservation} >
        {/*Table to display devices*/}
        <table>
          <thead style={style.tablehead}>
            <th>startDate:</th>
            <th>endDate:</th>
            <th>num of people:</th>
            <th>room:</th>
            <th></th>
            <th></th>
          </thead>
          <tr style={style.row}>

            <td>{this.props.startDate}</td>
            <td>{this.props.endDate}</td>
            <td>{this.props.numOfPeople}</td>
            <td>{this.props.Options}</td>
            <td>
            {/*Edit button shows up only when object is not updated*/}
            {(!this.state.toBeUpdated)
              ? (
                  <a href='' onClick={this.editReservation}>
                  <img alt='edit reservation' src={edit_logo} width="48" height="48"/>
                </a>
              ) :null
            }
            {/*Delete button */}
            </td>
            <td>
              <a href='' onClick={this.deleteReservation}>
                <img src={delete_logo} width="48" height="48" alt="delete reservation"/>
              </a>
            </td>
          </tr>
          {/*Additional row for edit form */}
          { (this.state.toBeUpdated)
            ? (
              <tr>
              <MuiThemeProvider>
              <td>
                <form onSubmit={this.handleEditReservation}>
                    <TextField
                      id ="editdataStart"
                      floatingLabelText="Change date start"
                      value={this.state.startDate}
                      onChange={this.handlestartDateChange}
                    />
                  </form>
              </td>
              <td>
                <form onSubmit={this.handleEditReservation}>

                  <TextField
                    id ="editdataEnd"
                    floatingLabelText="Change date end"
                    value={this.state.numLeft}
                    onChange={this.handleendDateChange}
                  />
                  </form>
              </td>
              <td>

              <form onSubmit={this.handleEditReservation}>
                    <TextField
                      id ="editnumOfPeople"
                      floatingLabelText="numOfPeople"
                      value={this.state.numOfPeople}
                      onChange={this.handleNumOfPeopleChange}
                    />
                    </form>

              </td>
              <td>

              <form onSubmit={this.handleEditReservation}>
                    <TextField
                      id ="editOptions"
                      floatingLabelText="Change the room"
                      value={this.state.options}
                      onChange={this.handleOptionsChange}
                    />
                    </form>
              </td>
              <td>

              <form onSubmit={this.handleEditReservation}>
                    <RaisedButton
                      label="Edit"
                      type="submit"
                      primary={true}
                    />
                    </form>
              </td>
              <td>
              <form onSubmit={this.handleEditReservation}>
                <RaisedButton
                  label="Cancel"
                  type="submit"
                  secondary={true}
                  onClick={this.cancelEditDevice}
                />
                </form>
              </td>

              </MuiThemeProvider>
              </tr>
              )
          :null  }
        </table>
      </div>
    )
  }
}

export default Reservation
