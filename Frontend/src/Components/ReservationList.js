import React, { Component } from 'react';
import Reservation from './Reservation';
import style from '../style';

class ReservationList extends Component {
  render() {
    console.log(this.props);
    let ReservationNodes = this.props.data.map(reservation => {
        return (
          <Reservation
            startDate={ reservation.startDate }
            endDate={reservation.endDate}
            numOfPeople={reservation.numOfPeople}
            Options={reservation.option}
            uniqueID={ reservation['_id'] }
            onReservationDelete={this.props.onReservationDelete}
            onReservationEdit={this.props.onReservationEdit}
            key={ reservation.id }>
          </Reservation>
        )
      })
      return (
        <div style={ style.deviceList }>
          { ReservationNodes }
        </div>
      )
    }
}

export default ReservationList;
