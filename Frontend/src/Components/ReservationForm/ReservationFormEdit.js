import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import SelectRoomField from './SelectRoomField';
import DataTextField from './DataTextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import axios from 'axios'

import LabelTextField from '../LabelTextField'

import style from '../../style'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

import {RESERVATION_BASE_URL} from '../../routes'


moment().format('MMMM Do YYYY, h:mm:ss a');

class ReservationFormEdit extends Component {
  constructor(props){
    super(props);
    this.state ={
      id: '',
      data: [],
      value: this.props.option,
      numOfPeople: '',
      personName: '',
      startDate: '',
      endDate: '',
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.id
    });
    axios.get(`${RESERVATION_BASE_URL}/${this.state.id}`)
    .then(res => {
      this.setState({data: res.data});
    })
  }

  EditReservation = (e)=>
  {
    e.preventDefault()
    this.setState({toBeUpdated: !this.state.toBeUpdated});
  }

    handleEditReservation =(e) =>{
    e.preventDefault();
    let id = this.props.id;
    let numOfPeople = this.state.numOfPeople.trim();
    let option = this.state.value;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    let personName = this.state.personName;
    let reservation = { numOfPeople: numOfPeople,
                                    option: option,
                                    startDate: startDate,
                                    endDate: endDate,
                                    personName: personName};
    this.props.onReservationEdit(id, reservation);
    this.setState({numOfPeople: '', option: '', personName: '' , startDate: '',endDate: '' })
  }

  deleteReservation = (e) => {
    e.preventDefault();
    let id = this.props.id;
    this.props.onReservationDelete(id);
    console.log('deleted');
  }

  handleNumOfPeopleChange = (e)=> {
    this.setState({numOfPeople: e.target.value});
  }

  handleSelectRoomChange = (event, index, value) => {
    this.setState({value});
  }

  handlePersonNameChange = (e) => {
    this.setState({personName: e.target.value})
  }

  handleClose = () => {
    this.props.closeDialog();
  }

  handleStartDateChange = (e) => {
   this.setState({startDate: e})
 }

 handleEndDateChange = (e) => {
  this.setState({
    endDate: e
  })
}



    render(){
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <RaisedButton
          label="Confirm"
          primary={true}
          keyboardFocused={false}
          onClick={this.handleEditReservation}
        />,
        <RaisedButton
          label="Delete"
          secondary={true}
          keyboardFocused={false}
          onClick={this.deleteReservation}
        />,
      ];
      return (
        <MuiThemeProvider>
          <Dialog
            title="Reservation form"
            modal={false}
            actions={actions}
            open={this.props.isDialogEditOpen }
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
          {(this.props.anyErrors)
            ?
            (
              <p style={style.errorValidation}>
                {this.props.errData1}
              </p>
            )
          : null}
            {(this.props.anyErrors)
              ?
              (
                <p style={style.errorValidation}>
                  {this.props.errData2}
                </p>
              )
            : null}
          <form onSubmit={this.handleEditReservation}  >
              <DatePicker

                  openToDate={moment(this.props.startDate)}
                  selected={this.state.startDate}
                  showTimeSelect
                  dateFormat="DD/MM/YYYY H:mm"
                  onChange={this.handleStartDateChange}
                  placeholderText={moment(this.props.startDate).format("DD/MM/YYYY H:mm").valueOf()}
                  showTimeSelect
                  timeFormat="HH:mm"
                  minTime={moment().hours(7).minutes(0)}
                  maxTime={moment().hours(18).minutes(0)}
                    />
                    <DatePicker
                        openToDate={moment(this.props.endDate)}
                        selected={this.state.endDate}
                        showTimeSelect
                        dateFormat="DD/MM/YYYY H:mm"
                        onChange={this.handleEndDateChange}
                        placeholderText={moment(this.props.endDate).format("DD/MM/YYYY H:mm").valueOf()}
                        showTimeSelect
                        timeFormat="HH:mm"
                        minTime={moment().hours(7).minutes(0)}
                        maxTime={moment().hours(18).minutes(0)}
      
                          />
          <SelectRoomField
            value={this.state.value}
            onRoomSelectChange={this.handleSelectRoomChange}
          />
          <LabelTextField
              id={'numofpeople'}
              value={this.state.numOfPeople}
              placeholder={this.props.numOfPeople}
              isLabelEnabled={true}
              label={"Enter number of people"}
              onChange={this.handleNumOfPeopleChange}
              position='left'
            />
          <LabelTextField
              id={'personName'}
              value={this.state.personName}
              placeholder={this.props.personName}
              isLabelEnabled={true}
              label={"Enter person name"}
              onChange={this.handlePersonNameChange}
              position='left'
          />

          </form>
          </Dialog>

          </MuiThemeProvider>
      )
    }
  }


  export default ReservationFormEdit;
