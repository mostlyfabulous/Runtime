import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { getPreferencesData, loadPreferences } from '../../actions/index'
import { loadPreferences, PREFERENCES_SUB, editPreferences } from '../../actions/index'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

export class PrefEditor extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.editEventView.calendarEvent);
    //const e = this.props.editEventView.calendarEvent;
    this.state = {
      // title     : e.title,
      // start     : e.start,
      // end       : e.end,
      // category  : e.extendedProps.category,
      // distance  : e.extendedProps.distance,
      // duration  : e.extendedProps.duration,
      // owner     : e.extendedProps.owner,
      // username  : e.extendedProps.username
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static propTypes = {
    preferencesReady: PropTypes.bool.isRequired,
    preferencesEvents: PropTypes.array.isRequired,
    preferencesSubscriptionStopped: PropTypes.bool.isRequired,
  }

  componentDidMount() {
   this.props.loadPreferences();
       console.log('get preferencs data in pref editor')
       console.log(this.props.preferences.preferencesEvents);
 }
  // componentDidMount() {
  //     this.props.getPreferencesData(this.props.preferences);
  //     // this.props.loadPreferences();
  //     console.log('get preferencs data in pref editor')
  //     console.log(this.props.preferences);
  // }

    handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      let currentUser = Meteor.user()._id;
      // console.log(name)
      // console.log(value)

      // if (value)
      //   this.setState({
      //     [name]: value
      //   });
      // this.props.loadPreferences();
      //     console.log('get preferencs data in handleChange')
      //     console.log(this.props.preferences);
      // const defaultValue = event.target[name];
      // console.log('edit user pref')
      // console.log(this.props.userPref.currentUser)
      // if (value)
      //   this.setState({
      //     userPref.currentUser.[name]: value
      //   });
      // else{
      //   console.log("defaultValue");
      //   console.log(defaultValue);
      //   this.setState({
      //     [name]: defaultValue
      //   });}
    }

    handleSubmit(e) {
        e.preventDefault();
        let editedPref = {};
        editedPref.clouds = parseInt(e.target.clouds.value);
        editedPref.min_temp = parseInt(e.target.minTemp.value);
        editedPref.max_temp = parseInt(e.target.maxTemp.value);
        editedPref.precipitation = parseInt(e.target.precipitation.value);
        let inputType = (typeof editedPref.clouds === "number") && (typeof editedPref.min_temp === "number") && (typeof editedPref.max_temp === "number") && (typeof editedPref.precipitation === "number");
        let inputRange = (editedPref.clouds <= 100) && (editedPref.clouds >= 0) && (editedPref.precipitation <= 100) && (editedPref.precipitation >= 0);
        console.log(inputType)
        if (inputType && inputRange) {
          console.log("Submitted event:");
          console.log(e.target.minTemp.value);
          console.log(editedPref)
          this.props.editPreferences(editedPref);
        } else {
          alert('invalid input(s)');
        }

      }
    render() {
      // console.log(start);
      let currentUser = Meteor.user()._id;
      console.log('pref editor')
      console.log(this.props.preferences.preferencesEvents)
      console.log(this.props.preferences.preferencesEvents[0])
      if (this.props.preferences.preferencesEvents[0] !== undefined) {
        return (
          <div>
          <h2> Current Preferences </h2>
          <p> Clouds (%): {this.props.preferences.preferencesEvents[0].clouds}</p>
          <p> Min Temp (%): {this.props.preferences.preferencesEvents[0].min_temp}</p>
          <p> Max Temp (%): {this.props.preferences.preferencesEvents[0].max_temp}</p>
          <p> Precipitation (%): {this.props.preferences.preferencesEvents[0].precipitation}</p>
            <h2>Edit Preferences:</h2>
            <form onSubmit={this.handleSubmit} ref='form'>
              <label htmlFor="clouds">Clouds (%)</label>
              <input type="number" id="clouds" name="clouds" defaultValue={this.props.preferences.preferencesEvents[0].clouds}
                onChange={this.handleChange} step="1" placeholder="%" />
              <br/>
              <label htmlFor="minTemp">Min Temp (°C)</label>
              <input type="number" id="minTemp" name="minTemp" defaultValue={this.props.preferences.preferencesEvents[0].min_temp}
                onChange={this.handleChange}  step="1" placeholder="°C"/>
              <br/>
              <label htmlFor="maxTemp">Max Temp (°C)</label>
              <input type="number" id="maxTemp" name="maxTemp" defaultValue={this.props.preferences.preferencesEvents[0].max_temp}
                onChange={this.handleChange}  step="1" placeholder="°C" />
              <br/>
              <label htmlFor="precipitation">Max Precipitation % (POP)</label>
              <input type="number" id="precipitation" name="precipitation" defaultValue={this.props.preferences.preferencesEvents[0].precipitation}
                onChange={this.handleChange} step="1" placeholder="%" />
              <br/>
              <button type="submit">Update User Preferences</button>
            </form>
          </div>
        );
      } else {
        return (
          <div>

            <h2>Edit Preferences:</h2>
            <form onSubmit={this.handleSubmit} ref='form'>
              <label htmlFor="clouds">Clouds</label>
              <input type="number" id="clouds" name="clouds" defaultValue={1||this.props.preferences.preferencesEvents[0].clouds}
                onChange={this.handleChange} step="1" placeholder="°C" />
              <br/>
              <label htmlFor="minTemp">Min Temp</label>
              <input type="number" id="minTemp" name="minTemp" defaultValue={1||this.props.preferences.preferencesEvents[0].min_temp}
                onChange={this.handleChange}  step="1" placeholder="°C"/>
              <br/>
              <label htmlFor="maxTemp">End Time</label>
              <input type="number" id="maxTemp" name="maxTemp" defaultValue={1||this.props.preferences.preferencesEvents[0].max_temp}
                onChange={this.handleChange}  step="1" placeholder="°C" />
              <br/>
              <label htmlFor="precipitation">Precipitation (POP)</label>
              <input type="number" id="precipitation" name="precipitation" defaultValue={1||this.props.preferences[0].precipitation}
                onChange={this.handleChange} step="1" placeholder="%" />
              <br/>
              <button type="submit">Update User Preferences</button>
            </form>
          </div>
        );
      }
      // const defaultValue = event.target[name];
      // console.log('edit user pref')
      // console.log(userPref.currentUser)
      // <h2>Edit Preferences: {title}</h2>

    }
  }

  const mapStateToProps = (state) => {
    return {
      preferences: state.preferences,
      preferencesReady: state.preferences.preferencesReady,
      preferencesEvents: state.preferences.preferencesEvents,
      preferencesSubscriptionStopped: state.preferences.preferencesSubscriptionStopped,
    }
  }


  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        loadPreferences,
        editPreferences
      },
      dispatch
    );
  };
export default connect(mapStateToProps, mapDispatchToProps)(PrefEditor);
//  export default connect(mapStateToProps, mapDispatchToProps)(PrefEditor);

//   constructor(props) {
//     super(props);
//     // console.log(this.props.editEventView.calendarEvent);
//     const e = this.props.editEventView.calendarEvent;
//     this.state = {
//
//       // title     : e.title,
//       // start     : e.start,
//       // end       : e.end,
//       // distance  : e.extendedProps.distance,
//       // duration  : e.extendedProps.duration,
//       // owner     : e.extendedProps.owner,
//       // username  : e.extendedProps.username
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleChange(event) {
//     const name = event.target.name;
//     const value = event.target.value;
//     let currentUser = Meteor.user()._id;
//     // const defaultValue = event.target[name];
//     // console.log('edit user pref')
//     // console.log(this.props.userPref.currentUser)
//     // if (value)
//     //   this.setState({
//     //     userPref.currentUser.[name]: value
//     //   });
//     // else{
//     //   console.log("defaultValue");
//     //   console.log(defaultValue);
//     //   this.setState({
//     //     [name]: defaultValue
//     //   });}
//   }
//
//   handleSubmit(jsEvent) {
//     jsEvent.preventDefault();
//     // event is being reserved for being passed into the dragEvent action
//     let e = {
//       event: {
//         id        : this.props.editEventView.calendarEvent.id,
//         title     : this.state.title,
//         start     : this.state.start,
//         end       : this.state.end,
//         extendedProps: {
//           distance  : this.state.distance,
//           owner     : this.state.owner,
//           username  : this.state.username
//         }
//       }
//     }
//     this.props.dragEvent(e);
//     this.props.toggleEventEditor(false, "");
//     console.log("Submitted event:");
//     console.log(e);
//
//   }
//
//   render() {
//     const {title, start, end, extendedProps} = this.props.editEventView.calendarEvent;
//     // console.log(start);
//     let currentUser = Meteor.user()._id;
//     // const defaultValue = event.target[name];
//     // console.log('edit user pref')
//     // console.log(userPref.currentUser)
//     return (
//       <div>
//         <h2>Edit Preferences: {title}</h2>
//         <form onSubmit={this.handleSubmit} ref='form'>
//           <label htmlFor="clouds">Clouds</label>
//           <input type="number" id="clouds" name="clouds" defaultValue={1||extendedProps.clouds}
//             onChange={this.handleChange} step="1" placeholder="°C" />
//           <br/>
//           <label htmlFor="minTemp">Min Temp</label>
//           <input type="number" id="minTemp" name="minTemp" defaultValue={1||extendedProps.minTemp}
//             onChange={this.handleChange}  step="1" placeholder="°C"/>
//           <br/>
//           <label htmlFor="maxTemp">End Time</label>
//           <input type="number" id="maxTemp" name="maxTemp" defaultValue={1||extendedProps.maxTemp}
//             onChange={this.handleChange}  step="1" placeholder="°C" />
//           <br/>
//           <label htmlFor="precipitation">Precipitation (POP)</label>
//           <input type="number" id="precipitation" name="precipitation" defaultValue={1||extendedProps.precipitation}
//             onChange={this.handleChange} step="1" placeholder="%" />
//           <br/>
//           <button type="submit">Update User Preferences</button>
//         </form>
//       </div>
//     );
//   }
//
//   // componentWillReceiveProps(nextProps) {
//   //   const {eventTitle, eventStart, eventEnd, eventExtendedProps} = this.props.editEventView.calendarEvent;
//   //   this.state = {
//   //     title     : eventTitle,
//   //     start     : eventStart,
//   //     end       : eventEnd,
//   //     distance  : eventExtendedProps.distance
//   //     // duration  : this.props.duration
//   //   };
//   // }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     editEventView: state.editEventView,
//     userPref: state.userPref
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       dragEvent, toggleEventEditor
//     },
//     dispatch
//   );
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(PrefEditor);
