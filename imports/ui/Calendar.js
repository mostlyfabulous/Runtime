import React, { Component } from 'react';

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendar from "@fullcalendar/google-calendar";
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { connect } from 'react-redux';
import { addEvent, renameEvent } from './actions/index'
import {bindActionCreators} from 'redux'

// Calendar component -
class Calendar extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       calendarEvents: this.props.calendarEvents
  //       }
  // }

  render() {
      return (
        <div>
          <FullCalendar
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
          defaultView="timeGridWeek"
          header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
              }}
          events={this.props.calendarEvents}
          editable={true}
          nowIndicator= {true}
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
          />
        </div>
      );
  }

  handleDateClick = (e) => {
    if (confirm("Would you like to add a run to " + e.dateStr + " ?")) {
      let newEvent = {
        id: (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000),
        title: "New Run",
        start: e.date,
        allDay: e.allDay
      }
      this.props.addEvent(newEvent);

    }
  }
  // should trigger a component to display and allow event editting
  // call component <EventModifier/>
  handleEventClick = (e) => {
    /* Without Redux, it is very inconvenient to modify an item.
    ** Investigate: https://reactjs.org/docs/update.html
    ** Currently using method: https://stackoverflow.com/a/49502115
    ** Could use a ref so a call the the calendarAPI
    ** would get the element more directly as well.
    ** e.g: e.event.setExtendedProp( title, eventName );
    */
    // let currentEvents = [...this.props.calendarEvents];
    let newEventName = prompt("Change run name to: ");
    this.props.renameEvent(e.event, name=newEventName);
  }
}

const mapStateToProps = (state) => {
  return {  calendarEvents: state.calendarEvents
         };
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addEvent,
      renameEvent
    },
    dispatch
  );
};



export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
