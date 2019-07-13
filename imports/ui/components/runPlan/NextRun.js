import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNextRun } from '../../actions/index'
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

  handleSubmit() {
    event.preventDefault();
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
            <label htmlFor="duration">Duration</label>
            <input type="text" id="duration" defaultValue={eventDuration} />
            <br/>
            <label htmlFor="start_time">Start Time</label>
            <input type="text" id="start_time" defaultValue={this.props.nextRun.start} />
            <br/>
            <label htmlFor="end_time">End Time</label>
            <input type="text" id="end_time" defaultValue={this.props.nextRun.end} />
            <br/>
            <label htmlFor="distance">Distance</label>
            <input type="text" id="distance" defaultValue={this.props.nextRun.distance} />
            <br/>
            <button type="submit">Find a Run!</button>
          </form>
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
            calendarEvents: state.calendar.calendarEvents
         };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getNextRun
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NextRun);
