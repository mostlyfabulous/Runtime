import { Meteor } from 'meteor/meteor';
import Runs from '/imports/api/runs';
import Weather from '/imports/api/weather';
import Preferences from '/imports/api/preferences';

const axios = require('axios');
import { config } from '../config';
import './runs.js'; // user.runs publication
import { createWeatherEvents } from '../imports/utils/createWeatherEvents.js'
import './weather.js'; // weather publication
import './preferences.js'; // preferences publication

Meteor.methods({
  'getGoogleKeys'() {
    return {id: process.env.GOOGLE_CLIENT_ID, api: process.env.GOOGLE_CALENDAR_API_TOKEN}
  }
});

Meteor.startup(() => {

});
