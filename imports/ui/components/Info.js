import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { config } from '../../../config.js';
import { createWeatherEvents } from '../../utils/createWeatherEvents.js'
import EventEditor from './EventEditor';
import { connect } from 'react-redux';
import { addWeatherData, addEvent, getNextRun, toggleEventEditor } from '../actions/index'
import {bindActionCreators} from 'redux'
const axios = require('axios');

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runData: {},
      weather: {},
      nextRun: {},
      current_temp: '',
      current_temp_min: '',
      current_temp_max: '',
      current_clouds: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoad();
  }
  handleLoad() {
    let weatherkey = config().openweatherapi
    axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,ca&appid=' + weatherkey)
  .then(response => {
    this.props.addWeatherData(response);
    console.log(this.props.weather);
    const {weather} = this.props;
    this.setState({
            current_temp: Math.round(weather.data.list[0].main.temp-273.15) + '°C',
            current_temp_min: Math.round(weather.data.list[0].main.temp_min-273.15) + '°C',
            current_temp_max: Math.round(weather.data.list[0].main.temp_max-273.15) + '°C',
            current_clouds: weather.data.list[0].clouds.all + '%'
    })

     this.props.addEvent(createWeatherEvents(weather.data.list));
  })
  .catch(error => {
    console.log(error);
  });
}


  handleChange(event) {
    this.setState({duration: event.target.duration});
  }

  handleSubmit() {
    event.preventDefault();
  }

  render() {
    let city = 'Vancouver';
    console.log(this.props.editEventView.editorView);
    if (this.props.editEventView.editorView) {
      return (
        <div>
          <h2>3-Hour Forecast: {city}</h2>
          <p><b>Current Temp:</b> {this.state.current_temp}</p>
          <p><b>Min/Max Temp:</b> {this.state.current_temp_min}/{this.state.current_temp_max}</p>
          <p><b>Clouds:</b> {this.state.current_clouds} </p>
          <h2>Your Next Run</h2>
          <form onSubmit={this.handleSubmit} ref='form'>
            <label htmlFor="duration">Duration</label>
            <input type="text" id="duration" value={this.props.nextRun.duration} />
            <br/>
            <label htmlFor="start_time">Start Time</label>
            <input type="text" id="start_time" value={this.props.nextRun.start} />
            <br/>
            <label htmlFor="end_time">End Time</label>
            <input type="text" id="end_time" value={this.props.nextRun.end} />
            <br/>
            <label htmlFor="distance">Distance</label>
            <input type="text" id="distance" value={this.props.nextRun.distance} />
            <br/>
            <button type="submit">Find a Run!</button>
          </form>
          <EventEditor/>
        </div>
    )
  } else {
      return (
        <div>
          <h2>3-Hour Forecast: {city}</h2>
          <p><b>Current Temp:</b> {this.state.current_temp}</p>
          <p><b>Min/Max Temp:</b> {this.state.current_temp_min}/{this.state.current_temp_max}</p>
          <p><b>Clouds:</b> {this.state.current_clouds} </p>
          <h2>Your Next Run</h2>
          <form onSubmit={this.handleSubmit} ref='form'>
            <label htmlFor="duration">Duration</label>
            <input type="text" id="duration" value={this.props.nextRun.duration} />
            <br/>
            <label htmlFor="start_time">Start Time</label>
            <input type="text" id="start_time" value={this.props.nextRun.start} />
            <br/>
            <label htmlFor="end_time">End Time</label>
            <input type="text" id="end_time" value={this.props.nextRun.end} />
            <br/>
            <label htmlFor="distance">Distance</label>
            <input type="text" id="distance" value={this.props.nextRun.distance} />
            <br/>
            <button type="submit">Find a Run!</button>
          </form>
        </div>
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.getNextRun(nextProps.calendarEvents)
  }
}

const mapStateToProps = (state) => {
  return {  weather: state.weather,
            nextRun: state.nextRun,
            calendarEvents: state.calendarEvents,
            editEventView: state.editEventView
         };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addWeatherData, addEvent, getNextRun, toggleEventEditor
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);

/*
export default InfoContainer = withTracker(() => {
  return {
    links: Links.find().fetch(),
  };
})(Info);
*/
