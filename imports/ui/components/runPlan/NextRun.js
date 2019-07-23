import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent, getNextRun } from '../../actions/index'
import {bindActionCreators} from 'redux'

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

class NextRun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextRun: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({duration: event.target.duration});
  }

  handleSubmit(e) {
    event.preventDefault();
    //let duration = {};
    let duration = parseInt(e.target.duration.value);
    let eventDuration = moment.duration(duration, "minutes").format("mm:ss:SS");

    // let eventDuration = moment.duration(duration, "minutes").format("h [hrs], m [min]");
    // let eventDuration = moment.duration(duration).format("h [hrs], m [min]");
    console.log('calendarEvents in next run')
    // console.log(this.props.calendarEvents);
    // console.log(duration);
    // console.log(eventDuration);
    // console.log(this.props.calendarEvents[0].start)
    //var time1 = this.props.calendarEvents[1].start;
    //var time0 = this.props.calendarEvents[0].start;
    // console.log(time1-time0);
    // let duration1 = time1-time0;
    // let eventDuration1 = moment.duration(duration1, "milliseconds").format("mm:ss:SS");
    // console.log(eventDuration1)
    let i = 0;
    let suggestions = [];
    while ((i < (this.props.calendarEvents.length-1)) && (suggestions.length < 1)) {
      var diff = this.props.calendarEvents[i+1].start - this.props.calendarEvents[i].end;
      if ((diff >= duration) && (this.props.calendarEvents[i].end !== null)) {
        console.log(this.props.calendarEvents[i].end)
        suggestions.push(this.props.calendarEvents[i].end);
      }
      i++;
    }
    if (suggestions.length > 0) {
      let unique = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
      let endTime = moment(suggestions[0]).add(duration, 'minutes').format();
      let endTimeUNIX = Date.parse(endTime);
      let endTimeFormatted = new Date(endTimeUNIX);
      let newEvent = {
        id: unique,
        _id: unique,
        title: "Suggested Run",
        start: suggestions[0],//e.date, // TODO: determine how to set timezone if needed
        end: endTimeFormatted,// moment(suggestions[0]).add(duration, 'minutes').format(),
        duration: moment.duration(duration, 'minutes'),
        allDay: false, //e.allDay,
        distance: 5,
        category: "run",
        owner: Meteor.userId(),//this.props.account.userId,
        username: Meteor.user().username,//this.props.account.user.username,
      }
      console.log('newEvent in plan a run')
      console.log(newEvent)
      this.props.addEvent(newEvent);
    } else {
      let unique = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
      let length = this.props.calendarEvents.lengthl
      let end = this.props.calendarEvents[length-1].end;
      let endTime = moment(end).add(duration, 'minutes').format();
      let endTimeUNIX = Date.parse(endTime);
      let endTimeFormatted = new Date(endTimeUNIX);
      let newEvent = {
        id: unique,
        _id: unique,
        title: "Suggested Run",
        start: suggestions[0],//e.date, // TODO: determine how to set timezone if needed
        end: endTimeFormatted,// moment(suggestions[0]).add(duration, 'minutes').format(),
        duration: moment.duration(duration, 'minutes'),
        allDay: false, //e.allDay,
        distance: 5,
        category: "run",
        owner: Meteor.userId(),//this.props.account.userId,
        username: Meteor.user().username,//this.props.account.user.username,
      }
      console.log('newEvent in plan a run')
      console.log(newEvent)
      this.props.addEvent(newEvent);
    }
    //let eventDuration = moment.duration(moment(this.props.calendarEvents[1].start).diff(moment(this.props.calendarEvents[0].start))).format("h [hrs], m [min]");
    // let try = parseInt(this.props.calendarEvents[1].start) - (this.props.calendarEvents[0].start);
    // console.log(try)
    // let tryDuration = moment.duration(try), "milliseconds").format("mm:ss:SS");
    // console.log(tryDuration)
    //'Vancouver';
    // e.target.city.value;
    // console.log('city event')
    // console.log(e.target.city.value)
    // console.log(typeof e.target.city.value)

    // let inputType = (typeof editedPref.clouds === "number") && (typeof editedPref.min_temp === "number") && (typeof editedPref.max_temp === "number") && (typeof editedPref.precipitation === "number") /*&& (typeof editedPref.city === "string")*/;
    // let inputRange = (editedPref.clouds <= 100) && (editedPref.clouds >= 0) && (editedPref.precipitation <= 100) && (editedPref.precipitation >= 0) && (editedPref.city.length > 0);
    // if (inputType && inputRange) {
    //   // console.log("Submitted event:");
    //   // console.log(e.target.minTemp.value);
    //   // console.log(editedPref)
    //   this.props.editPreferences(editedPref);
    // } else {
    //   alert('invalid input(s)');
    // }
  }

  render() {
    let eventDuration = "";
    const {title, start, end, extendedProps} = this.props.nextRun;;
    if (end) {
      // see duration formatting options here: https://github.com/jsmreese/moment-duration-format
      eventDuration = moment.duration(moment(end).diff(moment(start))).format("h [hrs], m [min]");
      // console.log(eventDuration);
    }


      return (
            <div>
              <h2>Your Next Run</h2>
              <form onSubmit={this.handleSubmit} ref='form'>
                <label htmlFor="duration">Duration (in minutes)</label>
                <input type="number" id="duration" defaultValue={eventDuration} />
                <br/>
                <button type="submit">Find a Run!</button>
              </form>
            </div>
      )
    //   return (
    //     <div>
    //       <h2>Your Next Run</h2>
    //       <form onSubmit={this.handleSubmit} ref='form'>
    //         <label htmlFor="duration">Duration</label>
    //         <input type="text" id="duration" defaultValue={eventDuration} />
    //         <br/>
    //         <label htmlFor="start_time">Start Time</label>
    //         <input type="text" id="start_time" defaultValue={this.props.nextRun.start} />
    //         <br/>
    //         <label htmlFor="end_time">End Time</label>
    //         <input type="text" id="end_time" defaultValue={this.props.nextRun.end} />
    //         <br/>
    //         <label htmlFor="distance">Distance</label>
    //         <input type="text" id="distance" defaultValue={this.props.nextRun.distance} />
    //         <br/>
    //         <button type="submit">Find a Run!</button>
    //       </form>
    //     </div>
    // )
  }

  componentWillReceiveProps(nextProps) {
    this.props.getNextRun(nextProps.calendarEvents)
  }
}

const mapStateToProps = (state) => {
  return {
            nextRun: state.nextRun,
            calendarEvents: state.calendar.calendarEvents
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
