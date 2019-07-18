import React, { Component } from 'react';
// import { withTracker } from 'meteor/react-meteor-data';
// import { config } from '../../../config.js';
// import { connect } from 'react-redux';
// import { addWeatherData, addEvent } from '../actions/index'
// import {bindActionCreators} from 'redux'
// const axios = require('axios');
// import PrefEditor from './preferences/PrefEditor';
import PrefEditor from './PrefEditor';
class UserPref extends Component {
  component
  render() {
    console.log('user pref')
    console.log(this.props.preferences)
    if (this.props.loadingPreferences === false && this.props.preferencesExists === true) {
        return (
            <PrefEditor preferences={this.props.preferences}/>
        );
    }
    else return (<div className='spinner'/>);
  }
}

  export default UserPref;
//   handleLoad() {
//     let weatherkey = config().openweatherapi
//     axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,ca&appid=' + weatherkey)
//   .then(response => {
//     const {weather} = this.props;
//     if (Meteor.user() !== null) {
//       this.setState({
//               userPref: {
//                 // _id: Meteor.user()._id,
//                 // username: Meteor.user().username
//               }
//           });
//     } else {
//       this.setState({userPref: {}});
//     }
//
//   })
//   .catch(error => {
//     console.log(error);
//   });
// }
//
//
//   handleChange(event) {
//     //this.setState({duration: event.target.duration});
//     const name = event.target.name;
//     const value = event.target.value;
//
//   }
//
//   handleChange(event) {
//     const name = event.target.name;
//     const value = event.target.value;
//     // const defaultValue = event.target[name];
//     if (value)
//       this.setState({
//         [name]: value
//       });
//     // else{
//     //   console.log("defaultValue");
//     //   console.log(defaultValue);
//     //   this.setState({
//     //     [name]: defaultValue
//     //   });}
//   }
//
//   handleSubmit() {
//     event.preventDefault();
//   }
//
//   render() {
//     console.log('render pref')
//     console.log(this.props.preferencesEvents);
//     return (
//       <div>
//         { (Meteor.user() !== null) ?
//           <div>
//         <h2>Your Current Preferences:</h2>
//         <PrefEditor/>
//         </div>
//         : <h2> Please log in to edit your preferences! </h2> }
//
//       </div>
//     );
//
//   }
//
// componentWillReceiveProps(nextProps) {
//   let rd = nextProps.weather.data;
//   let weatherEvents = rd.list.map( (threeHourEvent) =>
//       {
//       let c = 'black';
//       let t = threeHourEvent.main.temp
//       if (t > 298.15) c = 'red'; // warm
//       else if (t > 295.15 && t <= 298.15) c = 'green'; // pleasant
//       else if (t <= 295.15) c = 'yellow'; // cool
//       else (console.log(t))
//       let e =  ({
//       start: new Date(threeHourEvent.dt_txt+" GMT"),
//       end: new Date(threeHourEvent.dt_txt+" GMT-0300"),
//       rendering: 'background',
//       color: c
//       })
//       return e;
//     })
//   this.props.addEvent(weatherEvents);
// }
//
// }
//
// const mapStateToProps = (state) => {
//   return {  userPref: state.userPref,
//          };
//     // return {  user_input: state.user_input,
//     //           current_weather: state.current_weather
//     //        };
// }
//
//
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       addWeatherData, addEvent
//     },
//     dispatch
//   );
// };
//
//
//
// export default connect(mapStateToProps/*, {addWeatherData}*/, mapDispatchToProps)(UserPref);
