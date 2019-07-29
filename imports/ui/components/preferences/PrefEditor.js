import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadPreferences, PREFERENCES_SUB, editPreferences } from '../../actions/index'
import {bindActionCreators} from 'redux';
import { withAccount } from '../accounts/connector.js'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export class PrefEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static propTypes = {
    preferencesReady: PropTypes.bool.isRequired,
    preferencesEvents: PropTypes.array.isRequired,
    preferencesSubscriptionStopped: PropTypes.bool.isRequired,
  }

  componentDidMount() {
     console.log('get preferences data in pref editor')
     console.log(this.props.preferences.preferencesEvents);
 }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    let editedPref = {};
    editedPref.clouds = parseInt(e.target.clouds.value);
    editedPref.min_temp = parseInt(e.target.minTemp.value);
    editedPref.max_temp = parseInt(e.target.maxTemp.value);
    editedPref.precipitation = parseInt(e.target.precipitation.value);
    editedPref.city = e.target.city.value;
    let newUsername = e.target.username.value;
    if (newUsername) Meteor.call('updateUsername', newUsername, (err, res) => {
      if(err) console.log(err);
      if(res && res.error === 403) {
        confirm(res.reason + " Please choose another."); // Username already exists
        // console.log(res);
      }
    });

    let inputType = (typeof editedPref.clouds === "number") && (typeof editedPref.min_temp === "number") && (typeof editedPref.max_temp === "number") && (typeof editedPref.precipitation === "number") /*&& (typeof editedPref.city === "string")*/;
    let inputRange = (editedPref.clouds <= 100) && (editedPref.clouds >= 0) && (editedPref.precipitation <= 100) && (editedPref.precipitation >= 0) && (editedPref.city.length > 0);
    if (inputType && inputRange) {
      // console.log("Submitted event:");
      // console.log(e.target.minTemp.value);
      // console.log(editedPref)
      this.props.editPreferences(editedPref);
    } else {
      alert('invalid input(s)');
    }

  }
  render() {
    let userName = (this.props.account.user.username) ? this.props.account.user.username : "No username chosen";
    let currentPrefs = "";
    if (this.props.preferences.preferencesEvents[0] !== undefined) {
      currentPrefs = <div>
        <h2> Current Preferences </h2>
        <p> Username: {userName}</p>
        <p> Clouds (%): {this.props.preferences.preferencesEvents[0].clouds}</p>
        <p> Min Temp (°C): {this.props.preferences.preferencesEvents[0].min_temp}</p>
        <p> Max Temp (°C): {this.props.preferences.preferencesEvents[0].max_temp}</p>
        <p> Precipitation (%): {this.props.preferences.preferencesEvents[0].precipitation}</p>
        <p> Preferred City: {this.props.preferences.preferencesEvents[0].city}</p>
      </div>
    }
    return (
      <div>
        {currentPrefs}
        <h2>Edit Preferences:</h2>
        <form onSubmit={this.handleSubmit} ref='form'>
          <label htmlFor="username">Username</label>
          <input type="string" id="username" name="username" placeholder={userName}
            onChange={this.handleChange} />
          <br/>
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
          <label htmlFor="city">Preferred City</label>
            <select name="city" id ="city">
              <option value="Vancouver"> Vancouver </option>
              <option value="Toronto"> Toronto </option>
              <option value="Calgary"> Calgary </option>
            </select>
          <br/>
          <button type="submit">Update User Preferences</button>
        </form>
      </div>
    )
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

const PrefEditorContainer = withAccount(PrefEditor);

export default connect(mapStateToProps, mapDispatchToProps)(PrefEditorContainer);
