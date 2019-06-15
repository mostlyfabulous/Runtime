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
          eventDrop={this.handleEventDrop}
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
        // Date.parse returns the ms elapsed since January 1, 1970, 00:00:00 UTC
        // toString(16) converts the ms to hex which is concatenated with a
        // random number between 0 to 1000
        id: (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000),
        title: "New Run",
        start: e.date,
        allDay: e.allDay,
        duration: "5km"
      }
      this.props.addEvent(newEvent);

    }
  }
  // should trigger a component to display and allow event editting
  // call component <EventModifier/>
  handleEventClick = (e) => {
    let newEventName = prompt("Change run name to: ");
    this.props.renameEvent(e.event, name=newEventName);
  }

  handleEventDrop = (e) => {
    console.log("test");
    alert(e.event.title + " was dropped on " + e.event.start.toISOString());
    if (!confirm("Are you sure about this change?")) {
      e.revert();
    }
    // else call eventModifierReducer
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
