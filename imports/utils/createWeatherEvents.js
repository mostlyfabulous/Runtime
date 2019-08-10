const axios = require('axios');

export function createWeatherEvents(location) {

  // Returns 3 hour intervals background events with color according to temp
  let weatherkey = process.env.OPENWEATHER_API_TOKEN;
  axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + location + ',ca&appid=' + weatherkey)
    .then(response => {
      let cityData = response.data.city;
      let weatherEvents = response.data.list.map( (threeHourEvent) =>
           {
           let c = 'black';
           let t = threeHourEvent.main.temp
           if (t > 298.15) c = 'red'; // warm
           else if (t > 295.15 && t <= 298.15) c = 'green'; // pleasant
           else if (t <= 295.15) c = 'yellow'; // cool
           let e =  ({
             start: moment(threeHourEvent.dt_txt).toDate(),
             end: moment(threeHourEvent.dt_txt).add(3, 'hours').toDate(),
             city: cityData.name,
             countryCode: cityData.country,
             rendering: 'background',
             color: c,
             editable: false,
             temp: t 
           })
           return e;
         });
         weatherEvents.map( (event) => Weather.insert(event));
      return weatherEvents;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });

}

export function createUIWeatherEvents(weatherDataList) {

  let weatherEvents = weatherDataList.map( (threeHourEvent) =>
       {
       let c = 'black';
       let t = threeHourEvent.main.temp
       if (t > 298.15) c = 'red'; // warm
       else if (t > 295.15 && t <= 298.15) c = 'green'; // pleasant
       else if (t <= 295.15) c = 'yellow'; // cool
       let e =  ({
         start: moment(threeHourEvent.dt_txt).toDate(),
         end: moment(threeHourEvent.dt_txt).add(3, 'hours').toDate(),
         rendering: 'background',
         color: c,
         editable: false
       })
       return e;
     });

  return weatherEvents;
}
