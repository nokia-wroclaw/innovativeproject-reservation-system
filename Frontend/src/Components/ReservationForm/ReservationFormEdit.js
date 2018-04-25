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

moment().format('MMMM Do YYYY, h:mm:ss a');

class ReservationFormEdit extends Component {
  constructor(props){
    super(props);
    this.state ={
      data: [],
      value: 'WholeSpace',
      numOfPeople: '',
      personName: '',
    }
  }

  componentDidMount() {
    axios.get(`/api/reservations/${this.props.id}`)
    .then(res => {
      this.setState(res.data);
      console.log(res.data);
    })
  }

  EditReservation = (e)=>
  {
    e.preventDefault()
    this.setState({toBeUpdated: !this.state.toBeUpdated});
  }

    handleEditReservation =(e) =>{
    e.preventDefault();
    console.log(this.props.id)
    let id = this.props.id;
    let numOfPeople = this.state.numOfPeople.trim();
    let option = this.state.value;
    let startDate = this.props.startDate;
    let endDate = this.props.endDate;
    let personName = this.state.personName;
    let reservation = { numOfPeople: numOfPeople,
                                    option: option,
                                    startDate: startDate,
                                    endDate: endDate,
                                    personName: personName};
    this.props.onReservationEdit(id, reservation);
    this.setState({numOfPeople: '', option: '', personName: ''})
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


    render(){
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <RaisedButton
          label="Edit"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleEditReservation}
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
          <form onSubmit={this.handleEditReservation}>
            <DataTextField
              startDate={this.props.startDate}
              endDate={this.props.endDate}
            />
            <SelectRoomField
              //placeholder={this.props.option}
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
            />
          <LabelTextField
              id={'personName'}
              value={this.state.personName}
              placeholder={this.props.personName}
              isLabelEnabled={true}
              label={"Enter person name"}
              onChange={this.handlePersonNameChange}
          />

          </form>
          </Dialog>

          </MuiThemeProvider>
      )
    }
  }


  export default ReservationFormEdit;
