import React, { Component } from 'react';

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendar from "@fullcalendar/google-calendar";
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

// Calendar component -
export default class Calendar extends Component {
  constructor(props) {
    super(props);
    // must be bound for callback function to work
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  handleDateClick = (e) => {
    alert(e.dateStr)
  }

  render() {
    return (
      <div>
        <FullCalendar
        dateClick={this.handleDateClick}
        defaultView="timeGridWeek"
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={[
          { title: 'event 1', date: '2019-06-01' },
          { title: 'event 2', date: '2019-06-22' },
          { title: 'another event', date: '2019-06-23' },
          ]}
        />
      </div>
    );
  }

}
