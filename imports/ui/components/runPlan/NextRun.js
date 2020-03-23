import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent, getNextRun } from '../../actions/index'
import {bindActionCreators} from 'redux'

import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardHeader } from 'reactstrap';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const VALID_START = 6;
const VALID_END = 23;
momentDurationFormatSetup(moment);

class NextRun extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nextRun: {},
      modal: false,
      modalText: "",
      modalTitle: "",
      eventToAdd: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.toggle = this.toggle.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.toggleCancel = this.toggleCancel.bind(this);
  }
  handleChange(event) {
    this.setState({duration: event.target.duration});
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
 
  toggleConfirm() {
    if (this.state.modalTitle === "Add a run") {
      let newEvent = this.state.eventToAdd;
      this.props.addEvent(newEvent);
    }
    this.toggle();
  }
 
  toggleCancel() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  sortByStart(eventList) {
    let sortedList = eventList;
    sortedList.sort(function (a, b) {
      if (a.start && b.start) {
        var key1 = a.start;
        var key2 = b.start;

        if (key1 < key2) {
          return -1;
        } else if (key1 == key2) {
          return 0;
        } else {
          return 1;
        }
      }
    });
    return sortedList;
  }

  handleSubmit(e) {
    e.preventDefault();
    let duration = parseInt(e.target.duration.value);
    let eventDuration = moment.duration(duration, "minutes").format("mm:ss:SS");
    let suggestions = [];
    let now = new Date();
    let combinedEvents = this.props.calendarEvents.concat(this.props.googleEvents);
    let futureEvents = combinedEvents.filter(run => run.start >= now);
    let freeEvents = [];
    let sortedWeather = this.props.weatherEvents.filter(weather => weather.start >= now);
    sortedWeather = this.sortByStart(sortedWeather);

    futureEvents = this.sortByStart(futureEvents);
    let eventNow = {
      start: now,
      end: now
    };
    futureEvents.splice(0,0,eventNow);
    
    let lastFutureEvent = {
      start: sortedWeather[sortedWeather.length-1].end,
      end: sortedWeather[sortedWeather.length-1].end
    };

    futureEvents.push(lastFutureEvent);

    for (let i = 0; i < futureEvents.length-1; i++) {
      let current = futureEvents[i].end;
      let next = futureEvents[i+1].start;
      if (current.getDate() !== next.getDate()) {
        let start = new Date(current);
        start.setHours(VALID_END,0,0,0);
        let end = new Date(current);
        end.setDate(current.getDate()+1);
        end.setHours(VALID_START,0,0,0);
        let blockEvent = {
          start: start,
          end: end
        };
        futureEvents.splice(i+1,0,blockEvent);
      }
    }

    let firstFreeEvent = {};
    firstFreeEvent.start = now;
    firstFreeEvent.end = futureEvents[0].start;
    freeEvents.push(firstFreeEvent);

    for (let i = 0; i < futureEvents.length-1; i++){
      if (futureEvents[i].end.getTime() !== futureEvents[i+1].start.getTime()){
        let freeEvent = {};
        freeEvent.start = futureEvents[i].end;
        freeEvent.end = futureEvents[i+1].start;
        freeEvents.push(freeEvent)
      }
    }

    let freeEventsDurationFilter = freeEvents.filter(function(free) {
      let freeDuration = (free.end-free.start)/60000;
      return freeDuration > duration;
    });

    let totalDuration = (this.props.preferencesEvents[0].min_duration)*2 + duration/60;
    let freeEventsGapFilter = [];

    for (let entry of freeEventsDurationFilter) {
      let freeRange = (entry.end - entry.start)/3600000; // in Hours
      if (freeRange >= totalDuration){
        let newGap = {};
        let newStart = moment(entry.start).add(this.props.preferencesEvents[0].min_duration, 'hours').format();
        let newStartUNIX = Date.parse(newStart);
        newGap.start = new Date(newStartUNIX);

        let newEnd = moment(entry.end).subtract(this.props.preferencesEvents[0].min_duration, 'hours').format();
        let newEndUNIX = Date.parse(newEnd);
        newGap.end = new Date(newEndUNIX);
        freeEventsGapFilter.push(newGap);
      }
    }

    let tempBlock = moment(sortedWeather[1].start).diff(moment(sortedWeather[0].start), 'minutes');
    for (let i = 0; i < freeEventsGapFilter.length; i++) {
      let entry = freeEventsGapFilter[i];
      let entryDuration = moment(entry.end).diff(moment(entry.start),'minutes')
      if ((entryDuration > tempBlock) && (entryDuration/duration > 2)) {
        let newEnd = moment(entry.start).add(tempBlock, 'minutes').format();
        let endTimeUNIX = Date.parse(newEnd);
        let endTimeFormatted = new Date(endTimeUNIX);
        endTimeFormatted.setMinutes(0,0,0);
        let trimmedEvent = {
          start: entry.start,
          end: endTimeFormatted
        }
        let extraEvent = {
          start: endTimeFormatted,
          end: entry.end
        }
        freeEventsGapFilter.splice(i,1,trimmedEvent);
        freeEventsGapFilter.splice(i+1,0,extraEvent);
      }
    }

    let freeEventsWeatherFilter = [];
    let freeEventsWeatherFilterTemp = [];
    let tempVariance = [];
    let medianTemp = (this.props.preferencesEvents[0].max_temp + this.props.preferencesEvents[0].min_temp)/2;
    for (let entry of freeEventsGapFilter) {
      for (let i = 0; i < sortedWeather.length-1; i++) {
        if ((entry.start >= sortedWeather[i].start) && (entry.start <= sortedWeather[i+1].start)){
          let maxCond = this.props.preferencesEvents[0].max_temp >= (sortedWeather[i].temp -273.15);
          let minCond = this.props.preferencesEvents[0].min_temp <= (sortedWeather[i].temp -273.15);
          if (maxCond && minCond) {
            freeEventsWeatherFilterTemp.push(entry);
            tempVariance.push(Math.abs((sortedWeather[i].temp -273.15)-medianTemp));
          }
        }
      }

    }

    if (freeEventsWeatherFilterTemp.length < 3){
      freeEventsWeatherFilter = freeEventsGapFilter;
      tempVariance = [];
    } else {
      freeEventsWeatherFilter = [...new Set(freeEventsWeatherFilterTemp)];
    }

    let timeFilter = [];
    let tempVarianceFilter = [];
    for (let i = 0; i < freeEventsWeatherFilter.length; i++) {
      let gap = freeEventsWeatherFilter[i];
      let gapStart = gap.start.getHours();
      let gapEnd = gap.end.getHours();
      if ((VALID_START < gapStart && gapStart < VALID_END) && (VALID_START < gapEnd && gapEnd < VALID_END)){
        timeFilter.push(gap);
        if (tempVariance.length > 0) {
          tempVarianceFilter.push(tempVariance[i]);
        }
      }
    }

    suggestions = timeFilter;

    if (suggestions.length > 0) {
      let period = suggestions[0];
      if (tempVariance.length > 0) {
        let i = tempVariance.indexOf(Math.min(...tempVariance));
        period = suggestions[i];
      }

      let unique = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
      let endTime = moment(period.start).add(duration, 'minutes').format();
      let endTimeUNIX = Date.parse(endTime);
      let endTimeFormatted = new Date(endTimeUNIX);
      let newEvent = {
        id: unique,
        _id: unique,
        title: "Suggested Run",
        start: period.start,
        end: endTimeFormatted,
        duration: moment.duration(duration, 'minutes'),
        allDay: false,
        distance: 5,
        difficulty: 5,
        category: "run",
        owner: Meteor.userId(),
        username: Meteor.user().username,
      }

      this.setState({
        modalTitle: 'Add a run',
        modalText: "Would you like to add a run on " + moment(newEvent.start).format("dddd [the] Do, h:mm a") + "?",
        eventToAdd: newEvent
      })
      this.toggle();
    } else {
      //could not find run
      this.setState({
        modalTitle: 'No run scheduled',
        modalText: "Sorry, we were unable to find a time that works for you. You can change your preferences and try again or pick a time on the calendar.",
        eventToAdd: {}
      })
      this.toggle();
    }
  }

  render() {


    let eventDuration = "";
    const {title, start, end, extendedProps} = this.props.nextRun;;
    if (end) {
      eventDuration = moment.duration(moment(end).diff(moment(start))).format("h [hrs], m [min]");
    }

    let cancel = "";
    if (this.state.modalTitle === 'Add a run') {
      cancel = <Button color="secondary" onClick={this.toggleCancel}>Cancel</Button>
    }

      return (
            <div>
              <Card>
              <CardHeader tag="h2"> Your Next Run</CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit} ref='form'>
              <FormGroup>
                <Label htmlFor="duration">Duration (in minutes)</Label>
                <Row>
                <Col md={5}>
                  <Input type="number" id="duration" placeholder={"minutes"} />
                </Col>

                <Col md={7}>
                  <Button color="info" type="submit"> Find a Run! <i className="search icon"> </i></Button>
                </Col>
                </Row>
              </FormGroup>
              </Form>
              </CardBody>
              </Card>

              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{this.state.modalTitle}
                </ModalHeader>
                <ModalBody>
                  {this.state.modalText}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleConfirm}>Confirm</Button>{' '}
                  {cancel}
                </ModalFooter>
              </Modal>
            </div>
      )
  }

  componentWillReceiveProps(nextProps) {
    this.props.getNextRun(nextProps.calendarEvents)
  }
}

const mapStateToProps = (state) => {
  return {
            nextRun: state.nextRun,
            calendarEvents: state.calendar.calendarEvents,
            googleEvents: state.calendar.googleEvents,
            weatherEvents: state.weatherMiddleware.weatherEvents,
            weatherReady: state.weatherMiddleware.weatherReady,
            preferencesEvents: state.preferences.preferencesEvents,
         };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addEvent,
      getNextRun
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NextRun);
