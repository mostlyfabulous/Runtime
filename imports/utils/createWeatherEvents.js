const axios = require('axios');
import { config } from '../../config.js';

export function createWeatherEvents() {

  // Returns 3 hour intervals background events with color according to temp
  let weatherkey = process.env.OPENWEATHER_API_TOKEN;
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
      console.log(weatherEvents);
      return weatherEvents;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });

}

export function createUIWeatherEvents(weatherDataList) {

  // Returns 3 hour intervals background events with color according to temp
  let weatherEvents = weatherDataList.map( (threeHourEvent) =>
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

  return weatherEvents;
}
