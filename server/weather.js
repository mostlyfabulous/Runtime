import { Meteor } from 'meteor/meteor';
import Weather from '/imports/api/weather';
import { createWeatherEvents } from '../imports/utils/createWeatherEvents.js'

Meteor.publish('weather', function(location) {
 // args publish needs goes in: function(args)
  if (!this.userId) {
    console.log("No userId supplied");
    return this.ready();
  }
  console.log("Getting weather for: " + location);
  console.log("There are: " + Weather.find({city: location}).count() +
    " weather events for " + location);
  if (Weather.find({city: location}).count() === 0) {
    // make API call to get weather for city
    console.log("Getting weather for: " + location);
    createWeatherEvents(location);
  }

  return Weather.find({city: location});
});

// const handle = Meteor.subscribe('user.runs', args);
// when passing args is optional and used
// to pass a parameter to publish
// https://guide.meteor.com/data-loading.html#fetching
