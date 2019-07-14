import { Meteor } from 'meteor/meteor';
import Runs from '/imports/api/runs';

Meteor.publish('runs', function() {
 // args publish needs goes in: function(args)
  if (!this.userId) {
    console.log("No userId supplied");
    return this.ready();
  }
  console.log(this.userId);
  // console.log(Runs);
  //Runs.find({owner: this.userId}).toArray(function(err, items) {
  //   console.log("Returning any items found");
  //   console.log(items);
  //   console.log("End of items found");
  // });
  return Runs.find({owner: this.userId});
});

Meteor.publish('week', function() {
  if (!this.userId) {
    return this.ready();
  }
  let date = new Date();
  let pastDate = new Date();
  pastDate.setDate(pastDate.getDate()-6);
  pastDate.setHours(0,0,0,0);
  return Runs.find({start: {$gte: pastDate, $lt: date}, owner: this.userId}, {sort: {start: 1}})
})

// const handle = Meteor.subscribe('user.runs', args);
// when passing args is optional and used
// to pass a parameter to publish
// https://guide.meteor.com/data-loading.html#fetching
