import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/links';
const axios = require('axios');

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: "",
      start_time: "",
      end_time: "",

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({duration: event.target.duration});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {

    this.handleSubmit();

    return (
      <div>
        <h2>Learn Meteor!</h2>
      </div>
    );
    /*
    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{ links }</ul>
        <h2>Your Next Run</h2>
        <form>
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
    */
  }


  handleSubmit() {
  axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,ca&appid=4897c08ee8512a8295bb4bafbd77b966')
  .then(response => {
    console.log(response.data.city.name)
    let localDate = new Date(response.data.list[0].dt * 1000);
    console.log(localDate)
    console.log(Math.round(response.data.list[0].main.temp-273.15))
    console.log(Math.round(response.data.list[0].main.temp_min-273.15))
    console.log(Math.round(response.data.list[0].main.temp_max-273.15))
    // console.log(response.data.list[0].weather)
    console.log(response.data.list[0].clouds.all + '%')
    //console.log(response.data.list[0].rain.3h)
    console.log(response.data)
  })
  .catch(error => {
    console.log(error);
  });
}


}


export default InfoContainer = withTracker(() => {
  return {
    links: Links.find().fetch(),
  };
})(Info);
