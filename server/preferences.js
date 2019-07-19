import { Meteor } from 'meteor/meteor';
import Preferences from '/imports/api/preferences';

Meteor.publish('preferences', function() {
 // args publish needs goes in: function(args)
  if (!this.userId) {
    // console.log("No userId supplied");
    return this.ready();
  }
  if (Preferences.find({_id: this.userId}).fetch().length === 0) {
  let pref = {_id: this.userId, clouds: 50, min_temp: 10, max_temp: 20, precipitation: 25, city: 'Vancouver'};
    Preferences.insert(pref);
  }
  //console.log(this.userId);
  // console.log('edit user pref');
  // console.log(Meteor.user().userId);
  // let newPref = {min_temp: 10, max_temp: 20};
  // Preferences.update({_id:this.userId}, { $set: {pref: newPref} });
  return Preferences.find({_id: this.userId});
  //return Preferences.find();
});

Meteor.methods({
  'preferences.editPreferences'(pref) {
    // https://docs.meteor.com/api/collections.html#modifiers
    // Without using $-operators, a modifier is interpreted as a literal document,
    // and completely replaces whatever was previously in the database.
    // Find the document with ID 'event.id' and completely replace it.
    Preferences.update({_id: Meteor.user()._id}, pref, function (err, docsChanged) {
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
