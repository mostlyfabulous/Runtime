import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { config } from '../../../config.js';
import { connect } from 'react-redux';
import { addWeatherData, addEvent } from '../actions/index'
import {bindActionCreators} from 'redux'
const axios = require('axios');
import PrefEditor from './PrefEditor';


class UserPref extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userPref: {
  //     },
  //     current_temp: '',
  //     current_temp_min: '',
  //     current_temp_max: '',
  //     current_clouds: ''
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleLoad();
  // }
  /*  current_temp: "",
    current_temp_min: "",
    current_temp_max: "",
    current_clouds: "",*/
  handleLoad() {
    let weatherkey = config().openweatherapi
    axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,ca&appid=' + weatherkey)
  .then(response => {
    const {weather} = this.props;
    if (Meteor.user() !== null) {
      this.setState({
              userPref: {
                // _id: Meteor.user()._id,
                // username: Meteor.user().username
              }
          });
    } else {
      this.setState({userPref: {}});
    }

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
    console.log('render pref')
    console.log(this.props.preferencesEvents);
    return (
      <div>
        { (Meteor.user() !== null) ?
          <div>
        <h2>Your Current Preferences:</h2>
        <PrefEditor/>
        </div>
        : <h2> Please log in to edit your preferences! </h2> }

      </div>
    );

  }

componentWillReceiveProps(nextProps) {
  let rd = nextProps.weather.data;
  let weatherEvents = rd.list.map( (threeHourEvent) =>
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
      color: c
      })
      return e;
    })
  this.props.addEvent(weatherEvents);
}

}

const mapStateToProps = (state) => {
  return {  userPref: state.userPref,
         };
    // return {  user_input: state.user_input,
    //           current_weather: state.current_weather
    //        };
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addWeatherData, addEvent
    },
    dispatch
  );
};



export default connect(mapStateToProps/*, {addWeatherData}*/, mapDispatchToProps)(UserPref);
