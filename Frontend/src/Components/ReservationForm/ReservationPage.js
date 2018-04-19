import React ,{Component} from 'react'
import ReservationForm2 from './ReservationForm'
import axios from 'axios';
import Dnd from './Calendar';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class ReservationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: false,
      data:[],
      errors: '',
      isDialogOpen: false,
      isSnackbarOpen: false,
      showErrors: false,
    }
  }

  loadReservationFromServer= ()=> {
    axios.get('http://localhost:3001/api/reservations')
      .then(res => {
        this.setState({data: res.data.map((item)=> {
            return {
              start: new Date(item.startDate),
              end: new Date(item.endDate),
              title: item.option
            }
        })
      })
      })

    console.log(this.state.error)
  }

  componentDidMount() {
    this.loadReservationFromServer()
  }

  closeDialog= () => {
    this.setState({isDialogOpen: false})
  }

  handleReservationSubmit = (newreservation) => {
    //let reservations = this.state.reservation;
    axios.post(this.props.url, newreservation)
    .then((result) =>{
      const error = result.data.error;
      if(!error){
        const newItem = {
        start: new Date(result.data.startDate),
        end: new Date(result.data.endDate),
        title: result.data.option
      }
      this.setState({newreservation:  [...this.state.data, newItem], isDialogOpen: false, isSnackbarOpen: true});
      }
      else{
        console.log('some errors occured..')
        const errLength= result.data.errors.length;
        if(errLength === 1)  {
          const errData = {
            errMsg: result.data.errors[0],
          }
          console.log(errData.errMsg)
          this.setState({errors: [...this.state.errData]})
        }
        else if(errLength === 2){
          const errData = {
            errMsg1: result.data.errors[0],
            errMsg2: result.data.errors[1]
          }
          console.log(errData.errMsg1)
          console.log(errData.errMsg2)
          this.setState({errors: [...errData], showErrors: true})
        }
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
    console.log("." + this.state.errData)
    return (
      <div>
        <Dnd
          onRenderChange={this.handleRenderChange}
          data={this.state.data}
        />
        <ReservationForm2
          startDate = {this.state.startDate}
          endDate = {this.state.endDate}
          onReservationSubmit={this.handleReservationSubmit}
          isDialogOpen = {this.state.isDialogOpen}
          closeDialog = {this.closeDialog}
          errData={this.state.errData}
        />
        <MuiThemeProvider>
        <Snackbar
          open={this.state.isSnackbarOpen}
          message='Succesfully added your reservation'
          style={{textAlign: 'center'}}
          autoHideDuration={4000}
        />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default ReservationPage;
