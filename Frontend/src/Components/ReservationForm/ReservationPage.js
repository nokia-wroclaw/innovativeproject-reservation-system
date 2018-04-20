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
      isSnackbarOpen: false
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
    let reservations = this.state.data;
    axios.post(this.props.url, reservation)
    .then((result) =>{
      let error = result.data.error
      if(error){
        let errLength = result.data.errors.length;
        for(var i =0;i<errLength;i++){
          this.state.errData[i] = result.data.errors[i]
        }
        for(i =0;i<errLength;i++){
          console.log(result.data.errors[i]);
        }
        this.setState({
          areErrors: true
        });
      }
      else {
        const newItem = {
          start: new Date(result.data.startDate),
          end: new Date(result.data.endDate),
          title: result.data.option
        }
        this.setState({data:  [...this.state.data,newItem], isDialogOpen: false, isSnackbarOpen: true});
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  handleRenderChange = (e) =>  {
    this.setState({startDate: e.start})
    this.setState({endDate: e.end})
    this.setState({isDialogOpen: true})
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
                message='Reservation succesfully added'
                autoHideDuration={3000}
                style={{textAlign: 'center'}}
              />
            </MuiThemeProvider>
      </div>
    )
  }
}

export default ReservationPage;
