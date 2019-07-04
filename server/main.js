import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
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

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.publish('links', function() {
  if (!this.userId) {
    console.log("No userId supplied");
    return this.ready();
  }
    return Links.find();
});



Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  console.log(process.env.MONGO_URL);
  if (Runs.find().count() < 15) {
    insertRun();
  }
  // Should only add events that are not in the collection and
  // if possible, every 3 hours add a new event
  const query = {};
  const options = { sort: { start: -1 } };
  const sortedEvents = Weather.find(query, options).fetch();
  // console.log(sortedEvents);
  if (Weather.find().count() === 0) {
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
               editable: false // prevent users from modifying weather events
             })
             return e;
           });
        // console.log(weatherEvents);
        weatherEvents.map( (event) => Weather.insert(event));
        return weatherEvents;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });

    // events.map( (event) => Weather.insert(event));
    // Weather.insertMany(createWeatherEvents(), function (err, res) {
      // if (err) console.log(err);
    // })
  }
  // if (Weather.find().sort({start: -1})

  if (Links.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );
  }

});

// Meteor.publish('user', function(){
//     var currentUsername = this.userId;
//     return PlayersList.find({userId: currentUsername});
// });
