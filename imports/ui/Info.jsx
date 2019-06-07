import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/links';
const axios = require('axios');

class Info extends Component {
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
