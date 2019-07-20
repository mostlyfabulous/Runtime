import { Meteor } from 'meteor/meteor';
import Runs from '/imports/api/runs';

function insertRun() {
  let newId = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
  let run = {_id: newId, title: "15km Run", start: new Date(Date.now()+(4*60*60000)), distance: 15, category: "run", owner: "2BcpLKrNy6PcHWn6w", username: "awz"};
  Runs.insert(run);
}

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

Meteor.publish('upcoming', function() {
  if (!this.userId) {
    return this.ready();
  }
  let date = new Date();
  return Runs.find({start: {$gte: date}, owner: this.userId}, {sort: {start: 1}}, {limit: 1});
})

Meteor.publish('past', function() {
  if (!this.userId) {
    return this.ready();
  }
  let date = new Date();
  return Runs.find({start: {$lte: date}, owner: this.userId});
})

Meteor.methods({
  'runs.addRun'(event) {
    // console.log(event);
    Runs.insert(event);
  },
  'runs.updateRun'(event) {
    // https://docs.meteor.com/api/collections.html#modifiers
    // Without using $-operators, a modifier is interpreted as a literal document,
    // and completely replaces whatever was previously in the database.
    // Find the document with ID 'event.id' and completely replace it.
    Runs.update({_id: event.id}, event, function (err, docsChanged) {
      if (err) console.log(err);
      // console.log("event had id: " + event.id);
      // console.log(docsChanged + " documents were changed");
      })
  }
});

// const handle = Meteor.subscribe('user.runs', args);
// when passing args is optional and used
// to pass a parameter to publish
// https://guide.meteor.com/data-loading.html#fetching

// if (Runs.find().count() < 15) {
//   insertRun();
// }
