import React ,{Component} from 'react'
import ReservationForm2 from './ReservationForm'
import axios from 'axios';
import Dnd from './Calendar';

class ReservationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      showCalendar: true,
    }
    this.handleReservationSubmit = this.handleReservationSubmit.bind(this);
    this.handleStartDateSelect = this.handleStartDateSelect.bind(this);
    this.handleEndDateSelect = this.handleEndDateSelect.bind(this);
  }

  handleReservationSubmit(reservation){
    let reservations = this.state.data;
    reservation.id = Date.now();
    axios.post(this.props.url, reservation)
    .then((result) =>{
      this.setState({data:  [...reservations,result.data]});
    })
    .catch(err => {
      console.error(err);
    });
  }

  handleStartDateSelect(e) {
    this.setState({startDate: e.target.value})
  }
  handleEndDateSelect(e) {
    this.setState({endDate: e.target.value})
  }

  handleRenderChange(e){
    console.log(this.state.showCalendar)
    this.setState({showCalendar: !this.state.showCalendar})
    console.log(this.state.showCalendar)
    
  }

  render() {
    return (
      <div>
        {this.state.showCalendar
          ? (
            <Dnd
              onStartDateSelect={this.handleStartDateSelect}
              onEndDateSelect={this.handleEndDateSelect}
              onRenderChange={this.handleRenderChange.bind(this)}
            />
          )
          : (
            <ReservationForm2
              onReservationSubmit={this.handleReservationSubmit}
            />
          )
        }
      </div>
    )
  }
}

export default ReservationPage;
