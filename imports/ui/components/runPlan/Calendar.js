import React, { Component } from 'react';

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendar from "@fullcalendar/google-calendar";
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import { withAccount } from '../accounts/connector.js'
import { connect } from 'react-redux';
import { addEvent, dragEvent, highlightEvent, toggleEventEditor,
  loadWeatherEvents, WEATHER_SUB, loadRunEvents, RUNS_SUB,
  loadPreferences, PREFERENCES_SUB }
  from '../../actions/index';
import { stopSubscription } from 'meteor-redux-middlewares';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

// Calendar component -
class Calendar extends Component {

  static propTypes = {
    weatherReady: PropTypes.bool.isRequired,
    weatherEvents: PropTypes.array.isRequired,
    weatherSubscriptionStopped: PropTypes.bool.isRequired,
    calendarReady: PropTypes.bool.isRequired,
    calendarEvents: PropTypes.array.isRequired,
    calendarSubscriptionStopped: PropTypes.bool.isRequired,
    preferencesReady: PropTypes.bool.isRequired,
    preferencesEvents: PropTypes.array.isRequired,
  }

// componentDidMount() {
//     this.props.loadPreferences();
//     this.props.loadRunEvents(this.props.account.userId);
//  }
//
//  componentWillUnmount() {
//    this.props.stopSubscription(WEATHER_SUB);
//    this.props.stopSubscription(RUNS_SUB);
//    this.props.stopSubscription(PREFERENCES_SUB);
//  }
//
//  componentDidUpdate(prevProps, prevState) {
//    if (prevProps.preferencesReady !== this.props.preferencesReady) {
//      let {clouds, min_temp, max_temp, precipitation, city} = this.props.preferencesEvents[0];
//      console.log(city);
//      this.props.loadWeatherEvents(city);
//    }
//  }

  render() {
    return (
      <div>
        { (this.props.account.user !== {}) ?
          <FullCalendar
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
          eventDrop={this.handleEventDrop}
          eventResize={this.handleEventResize}
          defaultView="timeGridWeek"
          scrollTime={new Date(Date.now()).getHours()+":00"}
          header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
              }}
          events={this.props.calendarEvents.concat(this.props.weatherEvents)}
          editable={true}
          nowIndicator= {true}
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
          />: ''
        }

      </div>
    );
  }



  handleDateClick = (e) => {
    if (confirm("Would you like to add a run to " + e.dateStr + " ?")) {
        // Date.parse returns the ms elapsed since January 1, 1970, 00:00:00 UTC
        // toString(16) converts the ms to hex which is concatenated with a
        // random number between 0 to 1000
        let unique = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
        let newEvent = {
        id: unique,
        _id: unique,
        title: "New Run",
        start: e.date, // TODO: determine how to set timezone if needed
        end: moment(e.date).add(1, 'hours').format(),
        duration: moment.duration(1, 'hours'),
        allDay: e.allDay,
        distance: 5,
        category: "run",
        owner: this.props.account.userId,
        username: this.props.account.user.username,
      }
      console.log('newEvent')
      console.log(newEvent)
      this.props.addEvent(newEvent);

    }
  }
  // should trigger a component to display and allow event editting
  // Will send action to render <EventEditor/> in <Info/>
  handleEventClick = (e) => {
    // e.jsEvent.cancelBubble=true;
    if (e.event.rendering !== "background") {
      this.props.toggleEventEditor(true, e.event);
      this.props.highlightEvent(e.event);
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

  handleEventResize = (e) => {
    this.props.dragEvent(e);
  }

}

const mapStateToProps = (state) => {

  return {
    calendarReady: state.calendar.calendarReady,
    calendarEvents: state.calendar.calendarEvents,
    calendarSubscriptionStopped: state.calendar.calendarSubscriptionStopped,
    weatherReady: state.weatherMiddleware.weatherReady,
    weatherEvents: state.weatherMiddleware.weatherEvents,
    weatherSubscriptionStopped: state.weatherMiddleware.weatherSubscriptionStopped,
    preferencesReady: state.preferences.preferencesReady,
    preferencesEvents: state.preferences.preferencesEvents,
         };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addEvent,
      dragEvent,
      highlightEvent,
      toggleEventEditor,
      loadWeatherEvents,
      loadRunEvents,
      loadPreferences,
      stopSubscription
    },
    dispatch
  );
};

const CalendarContainer = withAccount(Calendar);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
