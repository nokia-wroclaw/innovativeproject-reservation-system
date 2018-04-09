 //Uzyj tego do wyswietlenia dancyh o zaznaczonym obszarze w promptice
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop/'

import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Radium from 'radium';

let testEvents = [
    {
      "start": new Date(2018, 3, 7, 10, 30, 0),
      "end": new Date(2018, 3, 7, 11, 30, 0),
      "title":"MakerSpace John Smith"
    },

    {
      "start": new Date(2018, 3, 7, 12, 30, 0),
      "end": new Date(2018, 3, 7, 13, 30, 0),
      "title":"WholeSpace Jan Kowalski"
    }
  ];

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar)

class Dnd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: testEvents,
      startDate: '',
      endDate: '',
      showCalendar: true,
      slotSelected:'',
    }

    this.moveEvent = this.moveEvent.bind(this);
    this.resizeEvent = this.resizeEvent.bind(this);

  }

  moveEvent({ event, start, end }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })
  }

  handleSlotSelection(slotInfo){
    let startDateSelected = new Date(slotInfo.start)
    let endDateSelected = new Date(slotInfo.end)
    console.log(startDateSelected)
    console.log(startDateSelected)
    this.setState({startDate: startDateSelected})
    this.setState({endDate: endDateSelected})
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
  }
  render() {
    return (
        <DragAndDropCalendar
          selectable
          events={this.state.events}
          onEventDrop={this.moveEvent}
          defaultView="week"
          defaultDate={new Date()}
          onSelectSlot={
            this.handleSlotSelection.bind(this),
            this.props.onRenderChange,
            this.props.onStartDateSelect,
            this.props.onEndDateSelect}
        />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
