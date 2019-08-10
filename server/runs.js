import { Meteor } from 'meteor/meteor';
import Runs from '/imports/api/runs';

function insertRun() {
  let newId = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
  let run = {_id: newId, title: "15km Run", start: new Date(Date.now()+(4*60*60000)), distance: 15, category: "run", owner: "2BcpLKrNy6PcHWn6w", username: "awz"};
  Runs.insert(run);
}

Meteor.publish('runs', function() {
  if (!this.userId) {
    return this.ready();
  }
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
    Runs.insert(event);
  },
  'runs.updateRun'(event) {
    Runs.update({_id: event.id}, event, function (err, docsChanged) {
      if (err) console.log(err);
      })
  },
  'runs.deleteRun'(eventId) {
    Runs.remove(eventId, function (err, res) {
      if (err) console.log(err);
    })
  }
});
