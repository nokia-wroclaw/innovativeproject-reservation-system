import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import SelectRoomField from './SelectRoomField';
import DataTextField from './DataTextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import DeviceList from '../Device/DeviceList'
import moment from 'moment'
import axios from 'axios'

import TextField from 'material-ui/TextField'

import LabelTextField from '../LabelTextField'

import style from '../../style'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {DEVICE_BASE_URL} from '../../routes'

moment().format('MMMM Do YYYY, h:mm:ss a');

class ReservationFormSubmit extends Component {
  constructor(props){
    super(props);
    this.state ={
      data: [],
      value: 'WholeSpace',
      numOfPeople: '',
      personName: '',
    }
  }

  handleSubmit= (e) =>{
    e.preventDefault();
    let numOfPeople = this.state.numOfPeople.trim();
    let option = this.state.value;
    let startDate = this.props.startDate;
    let endDate = this.props.endDate;
    let personName = this.props.userName;
    let deviceList = []
    this.props.deviceData.forEach((device)=>{
      var i =0;
      if(this.props.deviceQuantity[0] > 0)
      {
          deviceList.push({usedDevices: device._id, quantity: this.props.deviceQuantity[i]})
      }
      i++;
    })

    /*let deviceList = {
      usedDevices: this.props.deviceData[0]._id,
      quantity: this.props.deviceQuantity
    }*/
    console.log(deviceList);
    this.props.onReservationSubmit({numOfPeople: numOfPeople,
                                    option: option,
                                    startDate: startDate,
                                    endDate: endDate,
                                    personName: personName,
                                    deviceList: deviceList
                                    });
    this.setState({numOfPeople: '', option: ''})
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
/*  handleDataChange = (e) =>  {
    this.setState({
      startDate: e.target.startD
    });
  }*/

  handleClose = () => {
    this.props.closeDialog();
  }

  returnDevices()  {
    return this.props.deviceData
    .map(item => {
      return {
        deviceName: item.deviceName,
        deviceMax: item.deviceCurAvailable
      }
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
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];
    console.log(this.props.deviceQuantity[0]);
    console.log(this.props.deviceQuantity[1]);
    console.log(this.props.deviceQuantity[2]);

    return (
      <div>
        <MuiThemeProvider>
          <Dialog
            title="Reservation form"
            modal={false}
            actions={actions}
            open={this.props.isDialogSubmitOpen }
            onRequestClose={this.handleClose.bind(this)}
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
          <form onSubmit={this.handleSubmit}>
            <DataTextField
              startDate={this.props.startDate}
              endDate={this.props.endDate}
            />
          {/*<DatePicker
              selected={this.state.date}
              onSelect={this.handleSelect}
              onChange={this.handleDataChange}
              />*/}
            <SelectRoomField
              value={this.state.value}
              onRoomSelectChange={this.handleSelectRoomChange}
            />
          <LabelTextField
              id={'numofpeople'}
              value={this.state.numOfPeople}
              placeholder={'ex. 3'}
              isLabelEnabled={true}
              label={"Enter number of people"}
              onChange={this.handleNumOfPeopleChange}
              position='left'
            />
          <TextField
            id='reservationOn'
            defaultValue={this.props.userName}
            disabled={true}
            style={{marginLeft: '310px'}}
          />
          <DeviceList
            data={this.props.deviceData}
            renderType='deviceSelection'
            selectedAmount={this.props.deviceQuantity}
            onAmountChange={this.props.onChangeQuantity}
          />
          </form>
          </Dialog>

          </MuiThemeProvider>
      </div>
    )
  }
}

export default ReservationFormSubmit;
