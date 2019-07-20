import { Meteor } from 'meteor/meteor';
import Weather from '/imports/api/weather';

Meteor.publish('weather', function(location) {
 // args publish needs goes in: function(args)
  if (!this.userId) {
    console.log("No userId supplied");
    return this.ready();
  }
  console.log(this.userId);

  return Weather.find({city: location});
});

// const handle = Meteor.subscribe('user.runs', args);
// when passing args is optional and used
// to pass a parameter to publish
// https://guide.meteor.com/data-loading.html#fetching
