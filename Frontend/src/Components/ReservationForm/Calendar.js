 //Uzyj tego do wyswietlenia dancyh o zaznaczonym obszarze w promptice
import React, {Component} from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop/'

import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import calendarStyles from './Styles/CalendarStyles'


BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar)

class Dnd extends Component {
  static defaultProps = {
    data: []
  }
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      startDate: '',
      endDate: '',
      showCalendar: true,
      slotSelected:'',
    }

    this.moveEvent = this.moveEvent.bind(this);
    this.resizeEvent = this.resizeEvent.bind(this);

  }

  moveEvent({ event, start, end }) {
    const { data } = this.state

    const idx = data.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...data]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      data: nextEvents,
    })
  }

  handleSlotSelection(slotInfo){
    this.setState({startDate: new Date(slotInfo.start)})
    this.setState({endDate: new Date(slotInfo.end)})
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

  handleDateBoundaries = (val) => {
    const d = new Date()
    return new Date(d.getYear(), d.getMonth(), 0, val, 0, 0)
  }

  customRoomGetter = (event) => {
    if(event.title == 'WholeSpace'){
      return {
        className: 'wholeSpaceStyle',
        style: {
          backgroundColor: '#cc4350',
          border: '2px solid #c9646e'
        }
      }
    }
    else if(event.title == 'MakerSpace'){
      return{
        className: 'makerSpaceStyle',
        style: {
          backgroundColor: '#d19812',
          border: '2px solid #ceac5c'
        }
      }
    }
    else if(event.title == 'Lab'){
      return {
        className: 'labSpaceStyle',
        style: {
          backgroundColor: '#7dc93a',
          border: '1px solid #8ac458'
        }
      }
    }
    else if(event.title == 'OpenSpace'){
      return {
        className: 'openSpaceStyle',
        style: {
          backgroundColor: '#38a8c4',
          border: '1px solid #80bece'
        }
      }
    }
    else {
      return {
        className: 'calendar-style-not-defined',
        style: {
          backgroundColor: 'grey'
        }
      }
    }
  }

  render() {
    return (
        <DragAndDropCalendar
          selectable
          min={this.handleDateBoundaries(7)}
          max={this.handleDateBoundaries(19)}
          startAccessor='start'
          endAccessor='end'
          events={this.props.data}
          onEventDrop={this.moveEvent}
          defaultView="week"
          defaultDate={new Date()}
          onSelectSlot={this.props.onRenderChange}
          eventPropGetter={this.customRoomGetter}
         />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
