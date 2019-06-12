import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { config } from '../../config.js';
import Links from '../api/links';
import { connect } from 'react-redux';
import { addWeatherData } from './actions/index'
import {bindActionCreators} from 'redux'
const axios = require('axios');

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runData: {
      },
      weather: {
      },
      current_temp: '',
      current_temp_min: '',
      current_temp_max: '',
      current_clouds: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoad();
  }
  /*  current_temp: "",
    current_temp_min: "",
    current_temp_max: "",
    current_clouds: "",*/
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
    //console.log(this.props.weather.data.city.name)
    //let localDate = new Date(this.props.weather.data.list[0].dt * 1000);
    //console.log(localDate)


    //console.log(Math.round(this.props.weather.data.list[0].main.temp-273.15))
    //console.log(Math.round(this.props.weather.data.list[0].main.temp_min-273.15))
    //console.log(Math.round(this.props.weather.data.list[0].main.temp_max-273.15))
    // console.log(this.props.weather.data.list[0].weather)
  //  console.log(this.props.weather.data.list[0].clouds.all + '%')
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
          <input type="time" id="duration" step="60" placeholder="Hours: Minutes" />
          <br/>
          <label htmlFor="start_time">Start Time</label>
          <input type="time" id="start_time" step="60" placeholder="Hours: Minutes" />
          <br/>
          <label htmlFor="end_time">End Time</label>
          <input type="time" id="end_time" step="60" placeholder="Hours: Minutes" />
          <br/>
          <label htmlFor="distance">Distance</label>
          <input type="number" id="distance" step="0.01" placeholder="km/m" />
          <br/>
          <button type="submit">Find a Run!</button>
        </form>
      </div>
    );

  }


}

const mapStateToProps = (state) => {
  return {  weather: state.weather,

         };
    // return {  user_input: state.user_input,
    //           current_weather: state.current_weather
    //        };
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addWeatherData
    },
    dispatch
  );
};



export default connect(mapStateToProps/*, {addWeatherData}*/, mapDispatchToProps)(Info);

/*
export default InfoContainer = withTracker(() => {
  return {
    links: Links.find().fetch(),
  };
})(Info);
*/
