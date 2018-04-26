import React ,{Component} from 'react'
import ReservationFormSubmit from './ReservationFormSubmit'
import axios from 'axios';
import Dnd from './Calendar';

import Snackbar from 'material-ui/Snackbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReservationFormEdit from './ReservationFormEdit';

class ReservationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      areErrors: false,
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
  axios.get('http://localhost:3001/api/reservations').then(res => {
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

  componentDidMount() {
    this.loadReservationFromServer()
  }

  closeDialog= () => {
    this.setState({isDialogEditOpen: false, isDialogSubmitOpen: false, areErrors: false})
  }

  handleReservationSubmit = (reservation) => {
    axios.post(this.props.url, reservation)
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
            title: result.data.option
          };
          this.setState(() => ({
            data: [...this.state.data, newItem],
            isDialogSubmitOpen: false,
            isSnackbarOpen: true
          }));
          this.loadReservationFromServer()
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleReservationEdit = (id, reservation) =>{
      //let reservations = this.state.data;
      axios.put( `${this.props.url}/${id}`, reservation )
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
      axios.delete(`${this.props.url}/${id}`)
        .then(res => {
          let reservations = this.state.data.filter((item) => item._id !== id )
            this.setState({data: reservations, isDialogEditOpen: false, isSnackbarDeleteOpen: true});
            this.loadReservationFromServer()
            console.log('reservation deleted');
        })
        .catch(err => {
          console.error(err);
        });
      }

  handleRenderChangeSubmit = (e) => {
  if (e.start != 'Invalid Date' || e.end != 'Invalid Date') {
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

            <Dnd
              onRenderChangeSubmit={this.handleRenderChangeSubmit}
              data={this.state.data}
              onRenderChangeEdit={this.handleRenderChangeEdit}
              data={this.state.data}

            />

            <div>
              <ReservationFormSubmit
                startDate = {this.state.startDate}
                endDate = {this.state.endDate}
                onReservationSubmit={this.handleReservationSubmit}
                isDialogSubmitOpen = {this.state.isDialogSubmitOpen}
                closeDialog = {this.closeDialog}
                anyErrors = {this.state.areErrors}
                errData1={this.state.errData[0]}
                errData2={this.state.errData[1]}

              />
            </div>
            <div>
              <ReservationFormEdit
                data={this.state.data}
                id={this.state.id}
                numOfPeople={this.state.numOfPeople}
                personName={this.state.personName}
                startDate = {this.state.startDate}
                endDate = {this.state.endDate}
                option={this.state.option}
                onReservationEdit={this.handleReservationEdit}
                onReservationDelete={this.handleReservationDelete}
                isDialogEditOpen = {this.state.isDialogEditOpen}
                closeDialog = {this.closeDialog}
                anyErrors = {this.state.areErrors}
                errData1={this.state.errData[0]}
                errData2={this.state.errData[1]}
              />
            </div>
            <MuiThemeProvider>
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
            </MuiThemeProvider>
      </div>
    )
  }
}

export default ReservationPage;
