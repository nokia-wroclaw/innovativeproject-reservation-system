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
    this.setState({startDate: e.slotInfo.start})
    console.log(this.state.startDate)
  }

  handleEndDateSelect(e) {
    this.setState({endDate: e.slotInfo.end})
    console.log(this.state.endDate)
  }

  handleRenderChange(e) {
    this.setState({startDate: e.start})
    this.setState({endDate: e.end})
    console.log(this.state.startDate)
    console.log(this.state.endDate)
    this.setState({showCalendar: !this.state.showCalendar})
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
              startDate={this.state.startDate}
              onReservationSubmit={this.handleReservationSubmit}
            />
          )
        }
      </div>
    )
  }
}

export default ReservationPage;
