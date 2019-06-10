import React, { Component } from 'react';

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendar from "@fullcalendar/google-calendar";
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { config } from '../../config.js'
const axios = require('axios');

// Calendar component -
export default class Calendar extends Component {

  state = {
      calendarEvents: [
          {id: '1', title: "Event 1", start: new Date() },
          {id: '2', title: "Event 2", start: new Date() },
          {
            id: '3',
      start: '2014-11-10T10:00:00',
      end: '2014-11-10T16:00:00',
      rendering: 'background'
    }
        ]
      }
    handleLoad() {
        let weatherkey = config().openweatherapi
        console.log(weatherkey);
        axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,ca&appid=' + weatherkey)
      .then(response => {
        let rd = response.data;
        let localDate = new Date(rd.list[0].dt * 1000);
        let weatherEvents = rd.list.map( (threeHourEvent) =>
            ({
            start: new Date(threeHourEvent.dt_txt+" GMT"),
            end: new Date(threeHourEvent.dt_txt+" GMT+0300"),
            rendering: 'background',
            color: 'red'
            }))
        // console.log(weatherEvents);

        this.setState({
          calendarEvents: this.state.calendarEvents.concat(weatherEvents)
        });
      })
      .catch(error => {
        console.log(error);
      });

      }

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
        events={this.state.calendarEvents}
        editable={true}
        nowIndicator= {true}
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
        />
      </div>
    );
  }

  componentDidMount() {
    this.handleLoad();
  }

  handleDateClick = (e) => {
    if (confirm("Would you like to add a run to " + e.dateStr + " ?")) {
      this.setState({
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array with event for Redux compatabilty
          title: "New Run",
          start: e.date,
          allDay: e.allDay
        })
      });
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
    let currentEvents = [...this.state.calendarEvents];
    let newEventName = prompt("Change run name to: ");
    if (newEventName) {
      let renameIndex = this.state.calendarEvents.findIndex(function (event) {
        console.log(e.event);
        // console.log(event);
        return e.event.id === event.id ;
      });
      let eventToRename = {...currentEvents[renameIndex]};
      eventToRename.title = newEventName;
      currentEvents[renameIndex] = eventToRename;

      this.setState({
        calendarEvents: currentEvents
        })
      }
    }

}

const mapStateToProps = (state) => {
  return { weather: state.weather };
}
