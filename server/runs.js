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

// const handle = Meteor.subscribe('user.runs', args);
// when passing args is optional and used
// to pass a parameter to publish
// https://guide.meteor.com/data-loading.html#fetching
