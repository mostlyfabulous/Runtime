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
import { addEvent, renameEvent, dragEvent } from './actions/index'
import {bindActionCreators} from 'redux'

// Calendar component -
class Calendar extends Component {
  handleLoad(nextProps) {
      let rd = nextProps.weather.data;
      console.log(rd);
      let weatherEvents = rd.list.map( (threeHourEvent) =>
          {
          let c = 'black';
          let t = threeHourEvent.main.temp
          if (t > 298.15) c = 'red'; // warm
          else if (t > 295.15 && t <= 298.15) c = 'green'; // pleasant
          else if (t <= 295.15) c = 'yellow'; // cool
          else (console.log(t))
          let e =  ({
          start: new Date(threeHourEvent.dt_txt+" GMT"),
          end: new Date(threeHourEvent.dt_txt+" GMT-0300"),
          rendering: 'background',
          color: c
          })
          return e;
        })
      console.log(weatherEvents);

      this.setState({
        calendarEvents: this.state.calendarEvents.concat(weatherEvents)
      });
    };

  render() {
    console.log("calendar loading");
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

  componentWillReceiveProps(nextProps) {
    console.log("Calendar WillReceiveProps Weather from Store");
    // console.log(nextProps.weather);
    if (nextProps.weather.data) {
      // console.log(this.props.weather.data);
      // this.handleLoad(nextProps);
    }
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
       console.log(this.props.calendarEvents);
    }

  handleEventDrop = (e) => {
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
      dragEvent
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
