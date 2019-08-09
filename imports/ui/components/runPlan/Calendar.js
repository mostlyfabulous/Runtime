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
import GoogleCalendarHandler from './GoogleCalendarHandler';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import { Card, CardBody} from 'reactstrap';


// Calendar component -
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalTitle: "",
      modalText: "",
      eventToAdd: {},
      eventToUpdate: {}
    };
     this.toggle = this.toggle.bind(this);
     this.toggleConfirm = this.toggleConfirm.bind(this);
     this.toggleCancel = this.toggleCancel.bind(this);
   }

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

   toggle() {
   this.setState(prevState => ({
     modal: !prevState.modal
   }));
 }

 toggleConfirm() {
   // Date.parse returns the ms elapsed since January 1, 1970, 00:00:00 UTC
   // toString(16) converts the ms to hex which is concatenated with a
   // random number between 0 to 1000
   if (this.state.modalTitle === "Add a run") {
     let e = this.state.eventToAdd;
     let unique = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
     let newEvent = {
       id: unique,
       _id: unique,
       title: "New Run",
       start: e.date, // TODO: client's timezone set's the date's timezone
       end: moment(e.date).add(1, 'hours').toDate(),
       duration: moment.duration(1, 'hours'),
       durationActual: moment.duration(1, 'hours'),
       difficulty: 5,
       allDay: e.allDay,
       distance: 5,
       category: "run",
       owner: this.props.account.userId,
       username: this.props.account.user.username,
     }
     console.log('newEvent')
     console.log(newEvent)
     this.props.addEvent(newEvent);
     // clear this.state.eventToAdd?
   }
   if (this.state.modalTitle === "Change a run") {
     this.props.dragEvent(this.state.eventToUpdate);
   }
   this.toggle();
}

toggleCancel() {
this.setState(prevState => ({
  modal: !prevState.modal
}));
if (this.state.modalTitle === "Change a run") {
  this.state.eventToUpdate.revert();
  }
}
  // { (this.props.account.user !== {}) ?
  // <GoogleCalendarHandler/> : ''
  // }

  render() {
    return (
      <Card>
        <CardBody>
          <div>
            { (this.props.account.user !== {}) ?
            <>
              <GoogleCalendarHandler/>
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
              events={(this.props.calendarEvents.concat(this.props.weatherEvents))
                .concat(this.props.googleEvents)}
              editable={true}
              nowIndicator= {true}
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
              />
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{this.state.modalTitle}
                </ModalHeader>
                <ModalBody>
                  {this.state.modalText}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleConfirm}>Confirm</Button>{' '}
                  <Button color="secondary" onClick={this.toggleCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </>
            : ''
            }

          </div>
        </CardBody>
      </Card>
      
    );
  }
  handleDateClick = (e) => {
    console.log(e);
      this.setState({
        modalTitle: "Add a run",
        modalText: "Would you like to add a run on " + moment(e.date).format("dddd [the] Do, h:mm a") + "?",
        eventToAdd: e
      })
      this.toggle(); // bring up modal
  }

  // should trigger a component to display and allow event editting
  // Will send action to render <EventEditor/> in <Info/>
  handleEventClick = (e) => {
    // e.jsEvent.cancelBubble=true;
    if (e.event.extendedProps.category === "run") {
      this.props.toggleEventEditor(true, e.event);
      this.props.highlightEvent(e.event);
         console.log(this.props.calendarEvents);
      }
    }

  handleEventDrop = (e) => {
    // e.jsEvent.cancelBubble=true;
    console.log(e);
    if (e.event.extendedProps.category === "run") {
      this.setState({
        modalTitle: "Change a run",
        modalText: e.event.title + " was dropped on " +  moment(e.event.start).format("dddd [the] Do, h:mm a")
          + "? \n Are you sure about this change?",
        eventToUpdate: e
      })
      this.toggle();
    }
  }

  handleEventResize = (e) => {
    if (e.event.extendedProps.category === "run") this.props.dragEvent(e);
  }
  
}

const mapStateToProps = (state) => {

  return {
    calendarReady: state.calendar.calendarReady,
    calendarEvents: state.calendar.calendarEvents,
    calendarSubscriptionStopped: state.calendar.calendarSubscriptionStopped,
    googleEvents: state.calendar.googleEvents,
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
