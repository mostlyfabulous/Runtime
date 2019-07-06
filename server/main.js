import { Meteor } from 'meteor/meteor';
import Runs from '/imports/api/runs';
import Weather from '/imports/api/weather';

const axios = require('axios');
import { config } from '../config';
import './runs.js'; // user.runs publication
import { createWeatherEvents } from '../imports/utils/createWeatherEvents.js'
import './weather.js'; // weather publication

function insertRun() {
  let newId = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
  let run = {_id: newId, title: "15km Run", start: new Date(Date.now()+(4*60*60000)), distance: 15, category: "run", owner: "2BcpLKrNy6PcHWn6w", username: "awz"};
  Runs.insert(run);
}

Meteor.startup(() => {

  console.log(process.env.MONGO_URL);
  if (Runs.find().count() < 15) {
    insertRun();
  }
  // Should only add events that are not in the collection and
  // if possible, every 3 hours add a new event
  const query = {};
  const options = { sort: { start: -1 } };
  const sortedEvents = Weather.find(query, options).fetch();
  // get number of elapsed hours since last weatherEvent in DB
  const elapsedHours = moment().diff(moment(sortedEvents[0].start), 'hours');
  console.log(elapsedHours);
  // if -ve then DB will contain some overlapping events with an weather api call
  // and we should update those overlapping events with new data whilst adding
  // new events not in the DB
  if (elapsedHours < 0) {
    console.log(moment().format());
    hours = moment().get('hours');
    console.log(hours);
    next3HourBlock = (Math.ceil(hours/3)+2)*3; // don't remove nearest 3 weather blocks (inclusive)
    console.log(next3HourBlock);
    // makes sure only the future 3 hour events are removed and not the current one
    date3HourBlock = moment().hour(next3HourBlock).minute(0).second(0).format();
    console.log("Time point to remove weather events from: " + date3HourBlock);
    // weather seems to be given at GMT00:00 and so the api only returns
    // 3 hour block events that are 7 hours ahead of us
    Weather.remove({start: {$gt: date3HourBlock}}, function(err, count) {
      console.log("Removed: " + count + " weather events");
    });
  }
  // if 0 then we are at the latest event in the DB and should add new events
  // if +ve then DB should be sent new weather events via api call

  // console.log(sortedEvents);
  if (Weather.find().count() === 0 || elapsedHours < 0 || elapsedHours >= 0) {
    // let event = {"start":"2019-07-04T03:00:00-07:00","end":"2019-07-04T06:00:00-07:00","rendering":"background","color":"yellow","editable":false}
    // Weather.insert(event);
    let weatherkey = config().openweatherapi
    axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,ca&appid=' + weatherkey)
      .then(response => {
        let weatherEvents = response.data.list.map( (threeHourEvent) =>
             {
             let c = 'black';
             let t = threeHourEvent.main.temp
             if (t > 298.15) c = 'red'; // warm
             else if (t > 295.15 && t <= 298.15) c = 'green'; // pleasant
             else if (t <= 295.15) c = 'yellow'; // cool
             else (console.log(t))
             let e =  ({
               // start: moment(threeHourEvent.dt_txt+" GMT"),
               // end: moment(threeHourEvent.dt_txt+" GMT-0300"),
               start: moment(threeHourEvent.dt_txt).format(),
               end: moment(threeHourEvent.dt_txt).add(3, 'hours').format(),
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
        return weatherEvents;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });

    // events.map( (event) => Weather.insert(event));
  }

});

// Meteor.publish('user', function(){
//     var currentUsername = this.userId;
//     return PlayersList.find({userId: currentUsername});
// });
