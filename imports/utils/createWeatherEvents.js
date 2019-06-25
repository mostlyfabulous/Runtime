export function createWeatherEvents(weatherDataList) {

  let weatherEvents = weatherDataList.map( (threeHourEvent) =>
       {
       let c = 'black';
       let t = threeHourEvent.main.temp
       if (t > 298.15) c = 'red'; // warm
       else if (t > 295.15 && t <= 298.15) c = 'green'; // pleasant
       else if (t <= 295.15) c = 'yellow'; // cool
       else (console.log(t))
       let e =  ({
         start: new Date(threeHourEvent.dt_txt+" GMT"),
         end: new Date(threeHourEvent.dt_txt+" GMT-0300"),
         rendering: 'background',
         color: c,
         editable: false // prevent users from modifying weather events
       })
       return e;
     });

  return weatherEvents;
}
