import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { config } from '../../config.js';
import Links from '../api/links';
import { connect } from 'react-redux';
import { addWeatherData, addEvent, getNextRun } from './actions/index'
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
        });
    // add colored weather events to calendar as background events
    let weatherEvents = weather.data.list.map( (threeHourEvent) =>
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
        color: c,
        editable: false // prevent users from modifying weather events
        })
        return e;
      })
    this.props.addEvent(weatherEvents);

    //console.log(this.props.weather.data.city.name)
    //let localDate = new Date(this.props.weather.data.list[0].dt * 1000);
    //console.log(localDate)

    //console.log(Math.round(this.props.weather.data.list[0].main.temp-273.15))
    //console.log(Math.round(this.props.weather.data.list[0].main.temp_min-273.15))
    //console.log(Math.round(this.props.weather.data.list[0].main.temp_max-273.15))
    //console.log(this.props.weather.data.list[0].weather)
    //console.log(this.props.weather.data.list[0].clouds.all + '%')
    //console.log(this.props.weather.data.list[0].rain.3h)
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

  componentWillReceiveProps(nextProps) {
    this.props.getNextRun(nextProps.calendarEvents)
  }

}

const mapStateToProps = (state) => {
  return {  weather: state.weather,
            nextRun: state.nextRun,
            calendarEvents: state.calendarEvents
         };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addWeatherData, addEvent, getNextRun
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
