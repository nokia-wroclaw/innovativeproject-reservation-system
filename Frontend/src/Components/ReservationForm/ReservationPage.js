import React ,{Component} from 'react'
import ReservationForm2 from './ReservationForm'
import axios from 'axios';
import Dnd from './Calendar';

import Snackbar from 'material-ui/Snackbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ReservationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      areErrors: false,
      errData: [],
      isDialogOpen: false,
      isSnackbarOpen: false,
      successMsg: 'Reservation successfully added',
    }
  }

  loadReservationFromServer = () => {
  axios.get('http://localhost:3001/api/reservations').then(res => {
    this.setState({
      data: res.data.map((item) => {
        return {
          start: new Date(item.startDate),
          end: new Date(item.endDate),
          title: item.option
        }
      })
    });
  })
}

  componentDidMount() {
    this.loadReservationFromServer()
  }

  closeDialog= () => {
    this.setState({isDialogOpen: false, areErrors: false})
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
            isDialogOpen: false,
            isSnackbarOpen: true
          }));
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleRenderChange = (e) => {
  console.log(e.start);
  console.log(e.end);
  if (e.start != 'Invalid Date' || e.end != 'Invalid Date') {
    this.setState({
      isDialogOpen: true,
      startDate: e.start,
      endDate: e.end
    })
  }
}

  render() {
    return (
      <div>

            <Dnd
              onRenderChange={this.handleRenderChange}
              data={this.state.data}
            />

            <div>
              <ReservationForm2
                startDate = {this.state.startDate}
                endDate = {this.state.endDate}
                onReservationSubmit={this.handleReservationSubmit}
                isDialogOpen = {this.state.isDialogOpen}
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
            </MuiThemeProvider>
      </div>
    )
  }
}

export default ReservationPage;
