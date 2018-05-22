import React ,{Component} from 'react'
import ReservationFormSubmit from './ReservationFormSubmit'
import axios from 'axios';
import Dnd from './Calendar';

import {withRouter} from 'react-router-dom'

import Snackbar from 'material-ui/Snackbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReservationFormEdit from './ReservationFormEdit';

import {RESERVATION_BASE_URL, DEVICE_BASE_URL} from '../../routes'

import AuthService from '../AuthService';
import withAuth from '../withAuth';
const Auth = new AuthService();

class ReservationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      deviceData: [],
      areErrors: false,
      deviceName: '',
      deviceQuantity: [6],
      deviceCurAvailable: '',
      errData: [],
      isDialogSubmitOpen: false,
      isDialogEditOpen: false,
      isSnackbarOpen: false,
      successMsg: 'Reservation successfully added',
      isSnackbarDeleteOpen: false,
      deleteMsg: 'Reservation has been successfully deleted',
      ifEventExists:false
    }
  }

  loadReservationFromServer = () => {
  axios.get(`${RESERVATION_BASE_URL}`).then(res => {
    this.setState({
      data: res.data.map((item) => {
        return {
          start: new Date(item.startDate),
          end: new Date(item.endDate),
          title: item.option,
          id: item._id,
          numOfPeople: item.numOfPeople,
          personName: item.personName,
          option: item.option
        }
      })
    });
  })
}

loadDevicesFromServer = () => {
  axios.get(`${DEVICE_BASE_URL}`)
  .then(res=> {
    this.setState({
      deviceData: res.data.map((item) => {
        return {
          name: item.name,
          numLeft: item.numLeft,
          _id: item._id
        }
      })
    });
  })
  .catch(err => {console.log(err);})
}

componentWillMount(){
  if (!Auth.loggedIn()) {
    this.props.history.replace('/login')
  }
}

  componentDidMount() {
    this.loadReservationFromServer()
    this.loadDevicesFromServer();
    this.setState({
      deviceQuantity: '0',
      isSnackbarOpen: false
    });
  }

  closeDialog= () => {
    this.setState({isDialogEditOpen: false, isDialogSubmitOpen: false, areErrors: false, isSnackbarOpen: false})
  }

  changeQuantity = (e) => {
    this.setState({
      deviceQuantity: e.target.value
    });
  }

  handleReservationSubmit = (reservation) => {
    console.log(reservation);
    axios.post(RESERVATION_BASE_URL, reservation)
      .then((result) => {
        const error = result.data.error
        if (error) {
          this.setState({
            areErrors: true,
            errData: result.data.errors
          });
        } else {
          const newItem = {
            start: new Date(result.data.reservation.startDate),
            end: new Date(result.data.reservation.endDate),
            title: result.data.reservation.option
          };
          this.setState(() => ({
            data: [...this.state.data, newItem],
            isDialogSubmitOpen: false,
            deviceQuantity: 0
          }));
          setTimeout(()=>{
            this.setState({
              isSnackbarOpen: true
            });
          }, 100)
          this.setState({
            isSnackbarOpen: false
          });
          this.loadReservationFromServer()
          this.loadDevicesFromServer();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleReservationEdit = (id, reservation) =>{
      //let reservations = this.state.data;
      axios.put( `${RESERVATION_BASE_URL}/${id}`, reservation )
      .then(result => {
        //console.log(result.data);
        const index = this.state.data.findIndex(function(item) {
          return item._id === result.data._id;
        })
        const newData = [...this.state.data];
        newData[index] = result.data;
        this.setState({
          data: newData,
          isDialogEditOpen: false
        });
        this.loadReservationFromServer()
      })
      .catch(err => {
        console.error(err);
      })
    }

    handleReservationDelete = (id) => {
      axios.delete(`${RESERVATION_BASE_URL}/${id}`)
        .then(res => {
          let reservations = this.state.data.filter((item) => item._id !== id )
            this.setState({data: reservations, isDialogEditOpen: false, isSnackbarDeleteOpen: true});
            this.loadReservationFromServer()
        })
        .catch(err => {
          console.error(err);
        });
      }

  handleRenderChangeSubmit = (e) => {
    var end = e.end;
    var start = e.start
  if (start != 'Invalid Date' || end != 'Invalid Date') {
    this.setState({
      isSnackbarDeleteOpen: false,
      isDialogSubmitOpen: true,
      startDate: e.start,
      endDate: e.end,
      id: e.id
    })
  }
}

handleRenderChangeEdit = (e) => {
  this.setState({
    isDialogEditOpen: true,
    isSnackbarOpen: false,
    isSnackbarDeleteOpen: false,
    startDate: e.start,
    endDate: e.end,
    id: e.id,
    numOfPeople: e.numOfPeople,
    personName: e.personName,
    option: e.option
  })
}

  render() {
    return (
      <div>
        <div>
          <Dnd
            onRenderChangeSubmit={this.handleRenderChangeSubmit}
            data={this.state.data}
            onRenderChangeEdit={this.handleRenderChangeEdit}
          />
        </div>

        <div>
            <ReservationFormSubmit
              deviceData = {this.state.deviceData}
              startDate = {this.state.startDate}
              endDate = {this.state.endDate}
              onReservationSubmit={this.handleReservationSubmit}
              isDialogSubmitOpen = {this.state.isDialogSubmitOpen}
              closeDialog = {this.closeDialog}
              anyErrors = {this.state.areErrors}
              errData1={this.state.errData[0]}
              errData2={this.state.errData[1]}
              userName={this.props.user.sub[2]}
              deviceQuantity={this.state.deviceQuantity}
              onChangeQuantity={this.changeQuantity}
            />
          </div>
            {this.state.isDialogEditOpen && <div>
              <ReservationFormEdit
             data={this.state.data}
             numOfPeople={this.state.numOfPeople}
             id={this.state.id}
             personName={this.state.personName}
             startDate={this.state.startDate}
             endDate={this.state.endDate}
             option={this.state.option}
             onReservationEdit={this.handleReservationEdit}
             onReservationDelete={this.handleReservationDelete}
             isDialogEditOpen={this.state.isDialogEditOpen}
             closeDialog={this.closeDialog}
             anyErrors={this.state.areErrors}
             errData1={this.state.errData[0]}
             errData2={this.state.errData[1]}
           />
         </div>}
         <div>
           <MuiThemeProvider>
             <div>
               <Snackbar
                 open={this.state.isSnackbarOpen}
                 message={this.state.successMsg}
                 autoHideDuration={3000}
                 style={{textAlign: 'center'}}
               />
               <Snackbar
                 open={this.state.isSnackbarDeleteOpen}
                 message={this.state.deleteMsg}
                 autoHideDuration={3000}
                 style={{textAlign: 'center'}}
               />
             </div>
           </MuiThemeProvider>
         </div>
      </div>
    )
  }
}

export default withRouter(withAuth(ReservationPage));
