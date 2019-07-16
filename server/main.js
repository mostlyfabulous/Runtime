import { Meteor } from 'meteor/meteor';
import Runs from '/imports/api/runs';
import Weather from '/imports/api/weather';

const axios = require('axios');
import { config } from '../config';
import './runs.js'; // user.runs publication
import { createWeatherEvents } from '../imports/utils/createWeatherEvents.js'
import './weather.js'; // weather publication

Meteor.startup(() => {

  //console.log(process.env.MONGO_URL);

  // Should only add events that are not in the collection and
  // if possible, every 3 hours add a new event
  const query = {};
  const options = { sort: { start: -1 } };
  const sortedEvents = Weather.find(query, options).fetch();
  // get number of elapsed hours since last weatherEvent in DB
  const elapsedHours = 127 + moment().diff(moment(sortedEvents[0].start), 'hours', true);
  console.log("Hours since last weather update: " + (elapsedHours));
  console.log("Start of furthest event: " + moment(sortedEvents[0].start).format());
  console.log("End of furthest event: " + moment(sortedEvents[0].end).format());
  console.log("Start of closest event: " + moment(sortedEvents[39].start).format());
  console.log("End of closest event: " + moment(sortedEvents[39].end).format());
  // if -ve then DB will contain some overlapping events with an weather api call
  // and we should update those overlapping events with new data whilst adding
  // new events not in the DB
  console.log("Time now: " + moment().format());
  hours = moment().get('h') + (moment().get('s')/60);
  gmt = hours+7
  console.log("current hour: " + hours);
  // makes sure only the future 3 hour events are removed and not the current one
  gmt3HourBlock = (Math.ceil(gmt/3)*3)%24;
  console.log("GMT 3 Hour Block: " + gmt3HourBlock);
  date3HourBlock = moment().add(7, 'hours'); // set to correct day—could be a day ahead
  date3HourBlock.hour(gmt3HourBlock).minute(0).second(0) // set to correct 3 hour block
  date3HourBlock = date3HourBlock.format();
  if ((elapsedHours) >= 3) {
    console.log("Time point to remove weather events from: " + date3HourBlock);
    // weather is given at GMT00:00 and so the api only returns
    // 3 hour block events that are 7 hours ahead of us
    Weather.remove({start: {$gte: date3HourBlock}}, function(err, count) {
      console.log("Removed: " + count + " weather events");
    });
  }
  // if 0 then we are at the latest event in the DB and could add new events
  // if >3 hours then DB should be sent new weather events via api call

  if (Weather.find().count() === 0 || (elapsedHours) >= 3) {
    // let event = {"start":"2019-07-04T03:00:00-07:00","end":"2019-07-04T06:00:00-07:00","rendering":"background","color":"yellow","editable":false}
    // Weather.insert(event);
    let weatherkey = config().openweatherapi
    axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,ca&appid=' + weatherkey)
      .then(response => {
        let cityData = response.data.city;
        let weatherEvents = response.data.list.map( (threeHourEvent) =>
             {
             let c = 'black';
             let t = threeHourEvent.main.temp
             if (t > 298.15) c = 'red'; // warm
             else if (t > 295.15 && t <= 298.15) c = 'green'; // pleasant
             else if (t <= 295.15) c = 'yellow'; // cool
             else (console.log(t))
             let e =  ({
               start: moment(threeHourEvent.dt_txt).format(), // takes local time zone
               end: moment(threeHourEvent.dt_txt).add(3, 'hours').format(),
               city: cityData.name,
               countryCode: cityData.country,
               rendering: 'background',
               color: c,
               editable: false, // prevent users from modifying weather events
               temp: t // in degrees kelvin
             })
             return e;
           });
        // console.log(weatherEvents);
        // TODO: change to bulk insert
        // Weather.rawCollection().insert([entry1, entry2, entry3]);
        weatherEvents.map( (event) => Weather.insert(event));
        console.log("First weather event returned: " + weatherEvents[0].start);
        return weatherEvents;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });

    // events.map( (event) => Weather.insert(event));
  }

});
