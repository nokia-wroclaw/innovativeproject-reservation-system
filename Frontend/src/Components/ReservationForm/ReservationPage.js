import React ,{Component} from 'react'
import ReservationForm from './ReservationForm'
import axios from 'axios';

class ReservationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      devicedata: [],
    }
    this.handleReservationSubmit = this.handleReservationSubmit.bind(this);
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

  render() {
    return (
      <div>
        <ReservationForm
          onReservationSubmit={this.handleReservationSubmit}
        />
      </div>
    )
  }
}

export default ReservationPage;
