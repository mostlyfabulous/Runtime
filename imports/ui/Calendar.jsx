import React, { Component } from 'react';

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendar from "@fullcalendar/google-calendar";
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

// Calendar component -
export default class Calendar extends Component {
  render() {
    return (
      <div id='mainContent'>
        <FullCalendar defaultView="dayGridMonth"
        plugins={[ dayGridPlugin ]}
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
