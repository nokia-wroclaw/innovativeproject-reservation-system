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
    if(event.title === 'WholeSpace'){
      return {
        className: 'wholeSpaceStyle',
        style: calendarStyles.wholeSpaceStyle
      }
    }
    else if(event.title === 'MakerSpace'){
      return{
        className: 'makerSpaceStyle',
        style: calendarStyles.makerSpaceStyle
      }
    }
    else if(event.title === 'Lab'){
      return {
        className: 'labSpaceStyle',
        style: calendarStyles.labSpaceStyle
      }
    }
    else if(event.title === 'OpenSpace'){
      return {
        className: 'openSpaceStyle',
        style: calendarStyles.openSpaceStyle
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

SelectEvent=(event)=>{this.props.onRenderChangeEdit(event)
console.log(event)}

  render() {
    return (
        <DragAndDropCalendar
          selectable
          min={this.handleDateBoundaries(7)}
          max={this.handleDateBoundaries(19.5)}
          startAccessor='start'
          endAccessor='end'
          step={30}
          events={this.props.data}
          onEventDrop={this.moveEvent}
          defaultView="week"
          defaultDate={new Date()}
          onSelectSlot={this.props.onRenderChangeSubmit}
          eventPropGetter={this.customRoomGetter}
          onSelectEvent={this.SelectEvent}
         />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
