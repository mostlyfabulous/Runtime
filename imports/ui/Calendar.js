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
import { addEvent, renameEvent, dragEvent, toggleEventEditor } from './actions/index'
import {bindActionCreators} from 'redux'

// Calendar component -
class Calendar extends Component {

  render() {
    return (
      <div>
        <FullCalendar
        dateClick={this.handleDateClick}
        eventClick={this.handleEventClick}
        eventDrop={this.handleEventDrop}
        defaultView="timeGridWeek"
        scrollTime={new Date(Date.now()).getHours()+":00"}
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
        distance: 5,
        category: "run"
      }
      this.props.addEvent(newEvent);

    }
  }
  // should trigger a component to display and allow event editting
  // call component <EventModifier/>
  handleEventClick = (e) => {
    // e.jsEvent.cancelBubble=true;
    this.props.toggleEventEditor();
    if (e.event.rendering !== "background") {
      let newEventName = prompt("Change run name to: ");
         this.props.renameEvent(e.event, name=newEventName);
         console.log(this.props.calendarEvents);
      }
    }

  handleEventDrop = (e) => {
    // e.jsEvent.cancelBubble=true;
    alert(e.event.title + " was dropped on " + e.event.start.toISOString());
    if (!confirm("Are you sure about this change?")) {
      e.revert();
    } else {
      this.props.dragEvent(e);
    }
    console.log(this.props.calendarEvents);
  }

}

const mapStateToProps = (state) => {
  return {
    calendarEvents: state.calendarEvents,
    weather: state.weather
         };
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addEvent,
      renameEvent,
      dragEvent,
      toggleEventEditor
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
