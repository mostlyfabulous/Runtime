import { Meteor } from 'meteor/meteor';
import Weather from '/imports/api/weather';
import DarkSky from '/imports/api/weatherDarkSky';
import DarkSkyApi from 'dark-sky-api';
import { createWeatherEvents } from '../imports/utils/createWeatherEvents.js';
const canadaCities = require('../imports/utils/CanadaCityLatLonPairs.json');
const locations = ["Vancouver", "Toronto", "Calgary"];

function getHourlyForecast(city, country) {
  const cityData = canadaCities.find((entry) => entry.city === city);
  if (cityData === undefined) {
    return;
  }
  const position = {latitude: cityData.lat, longitude: cityData.lng};
  DarkSkyApi.initialize(process.env.DARKSKY_SECRET_KEY, true, 'si', 'en', function(item) {
  return item; 
  });
  DarkSkyApi.extendHourly(true);
  DarkSkyApi.loadItAll('daily,minutely,flags', position)
  .catch(err => console.log(err))
  .then(result => {
    console.log(result);
    result.hourly.data.map( (h) => {
      h.start = moment(h.time*1000).toDate();
      h.end = moment(h.time*1000).add(1, 'hours').toDate();
      h.city = city;
      h.country = country;
      h.editable = false;
      h.rendering = 'background';
      DarkSky.upsert({$and:[{time: h.time},{city: h.city}]}, h); // update events or insert if not present
    });
  });
}
/**
 * expects a 'city' and 'country'
 * @param {object} city
 * @param {object} country
**/
Meteor.publish('weatherDarkSky', function(city) {
  if (!this.userId || !city) {
    return this.ready();
  }
  if (DarkSky.find({city: city}).count() === 0) getHourlyForecast(city, "Canada");
  return DarkSky.find({city: city});
});

/**
 * expects an array of locations
 * @param {array} location
**/
function updateWeatherForLocations(locations) {
  if( locations.length > 0) {
    locations.map( (location) => {
      if (Weather.find({city: location}).count() === 0) {
        createWeatherEvents(location);
      }
      const query = { $and: [ {city: {$eq: location}}, {start: {$gt: moment().toDate() }} ] };
      const options = { sort: { start: -1 } };
      const sortedEvents = Weather.find(query, options).fetch();
      let hours = moment().get('h') + (moment().get('s')/60);
      let timeDifference = moment().utcOffset()/60 // get hours ahead/behind UTC
      let elapsedHours = 0;
      if (sortedEvents.length > 0) {
        elapsedHours = 120 - timeDifference + moment().diff(moment(sortedEvents[0].start), 'hours', true);
      }
      utc3HourBlock = Math.ceil(((hours-timeDifference)%24)/3)*3;
      date3HourBlock = moment().add(-timeDifference, 'hours'); // set to correct day: could be a day ahead
      date3HourBlock.hour(utc3HourBlock).minute(0).second(0); // set to correct 3 hour block
      date3HourBlock = date3HourBlock.toDate();
      const removeQuery = ({$and: [{city: {$eq: location}}, {start: {$gte: date3HourBlock}} ] } );
      if (Weather.find(query).count() === 0
            || (elapsedHours) >= 3) {
          Weather.remove(removeQuery, function(err, count) {
          });
          createWeatherEvents(location);
      }

    });
  }

}

// refetch weather for all cities every 3 hours
if (!(Meteor.absoluteUrl()+"").includes('local')) {
  Meteor.setInterval(updateWeatherForLocations(locations), 3*60*60*1000) // delay in ms before function re-run
  locations.map( (city) =>
    Meteor.setInterval(getHourlyForecast(city, "Canada"), 6*60*60*1000));
} else {
}

Meteor.publish('weather', function(location) {
  if (!this.userId || !location) {
    return this.ready();
  }
  return Weather.find({city: location});
});
