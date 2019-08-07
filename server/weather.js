import { Meteor } from 'meteor/meteor';
import Weather from '/imports/api/weather';
import DarkSky from '/imports/api/weatherDarkSky';
import DarkSkyApi from 'dark-sky-api';
import { createWeatherEvents } from '../imports/utils/createWeatherEvents.js';
const canadaCities = require('../imports/utils/CanadaCityLatLonPairs.json');
const locations = ["Vancouver", "Toronto", "Calgary"];
// const api = new DarkSkyApi(process.env.DARKSKY_SECRET_KEY, true, 'si', 'en',
//   function(item) {
//   // add a location representation using moment.calender
//   item.location = "Vancouver";
//   // add units object onto item
//   item.units = api.getResponseUnits(); // this would be outdated if you changed api units later
//   return item; // must return weather data item
// });

function getHourlyForecast(city, country) {
  const cityData = canadaCities.find((entry) => entry.city === city);
  if (cityData === undefined) {
    console.log("Could not find city in JSON list");
    return;
  }
  const position = {latitude: cityData.lat, longitude: cityData.lng};
  DarkSkyApi.initialize(process.env.DARKSKY_SECRET_KEY, true, 'si', 'en', function(item) {
    // postprocessor function body to add properties to weather data response
    // add units object onto item
    // item.units = DarkSkyApi.getResponseUnits(); // this would be outdated if you changed api units later
  return item; // must return weather data item
  });
  DarkSkyApi.extendHourly(true); // returns 169 hourly forecasts in "result.hourly.data"
  DarkSkyApi.loadItAll('daily,minutely,flags', position) // (excludeTheseCalls, LatLon)
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
    if (!this.userId) console.log("No userId supplied");
    if (!city) console.log("No city supplied");
    return this.ready();
  }
  console.log(city);
  console.log("User subbed to DarkSky");
  if (DarkSky.find({city: city}).count() === 0) getHourlyForecast(city, "Canada");
  // console.log("No events for "+city);
  console.log(DarkSky.find({city: city}).count());
  return DarkSky.find({city: city});
});

/**
 * expects an array of locations
 * @param {array} location
**/
function updateWeatherForLocations(locations) {
  console.log("Updating weather for all cities");
  if( locations.length > 0) {
    locations.map( (location) => {
      console.log("Getting weather for: " + location);
      console.log("There are: " + Weather.find({city: location}).count() +
        " weather events for " + location);
      if (Weather.find({city: location}).count() === 0) {
        // make API call to get weather for city
        console.log("Getting weather for: " + location);
        createWeatherEvents(location);
      }
      const query = { $and: [ {city: {$eq: location}}, {start: {$gt: moment().toDate() }} ] };
      const options = { sort: { start: -1 } };
      const sortedEvents = Weather.find(query, options).fetch();
      // get number of elapsed hours since last weatherEvent in DB
      console.log("Time now: " + moment().format());
      let hours = moment().get('h') + (moment().get('s')/60);
      let timeDifference = moment().utcOffset()/60 // get hours ahead/behind UTC
      console.log("Time difference is: " + timeDifference + " hours");
      let elapsedHours = 0;
      if (sortedEvents.length > 0) {
        elapsedHours = 120 - timeDifference + moment().diff(moment(sortedEvents[0].start), 'hours', true);
        console.log("Hours since last weather update: " + (elapsedHours));
        console.log("Start of furthest event: " + moment(sortedEvents[0].start).format());
        console.log("End of furthest event: " + moment(sortedEvents[0].end).format());
        // console.log("Start of closest event: " + moment(sortedEvents[39].start).format());
        // console.log("End of closest event: " + moment(sortedEvents[39].end).format());
      }
      // makes sure only the future 3 hour events are removed and not the current one
      utc3HourBlock = Math.ceil(((hours-timeDifference)%24)/3)*3;
      console.log("UTC 3 Hour Block: " + utc3HourBlock);
      date3HourBlock = moment().add(-timeDifference, 'hours'); // set to correct day: could be a day ahead
      date3HourBlock.hour(utc3HourBlock).minute(0).second(0); // set to correct 3 hour block
      date3HourBlock = date3HourBlock.toDate();
      const removeQuery = ({$and: [{city: {$eq: location}}, {start: {$gte: date3HourBlock}} ] } );
      // if 0 then we are at the latest event in the DB and could add new events
      // if >3 hours then DB should be sent new weather events via API call
      console.log("There are: " + Weather.find(removeQuery).count()
        + " events after " + date3HourBlock + " for " + location);
      if (Weather.find(query).count() === 0
            || (elapsedHours) >= 3) {
              /**
              * DB will contain some overlapping events with a weather API call
              * and we should update those overlapping events with new data whilst adding
              * new events not in the DB.
              * Weather is given at UTC and so the API only returns
              * 3 hour block events that are 7 hours ahead of us (PST)
              **/
          console.log("Time point to remove weather events from: " + date3HourBlock);
          Weather.remove(removeQuery, function(err, count) {
            console.log("Removed: " + count + " weather events for " + location);
          });
          console.log("Adding weather events for " + location);
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
  console.log("Server is running locally, periodic weather updates disabled.");
}

Meteor.publish('weather', function(location) {
  if (!this.userId || !location) {
    if (!this.userId) console.log("No userId supplied");
    if (!location) console.log("No location supplied");
    return this.ready();
  }
  return Weather.find({city: location});
});
