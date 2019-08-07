import { Meteor } from 'meteor/meteor';
import Preferences from '/imports/api/preferences';

Meteor.publish('preferences', function() {
 // args publish needs goes in: function(args)
  if (!this.userId) {
    // console.log("No userId supplied");
    return Preferences.find({_id: "defaultUser"});
  }
  if (Preferences.find({_id: this.userId}).fetch().length === 0) {
  let pref = {_id: this.userId, clouds: 50, min_temp: 10, max_temp: 20, precipitation: 25, city: 'Vancouver', min_duration: 24, background: "#fff"};
    Preferences.insert(pref);
  }
  return Preferences.find({_id: this.userId});
});

Meteor.methods({
  'preferences.editPreferences'(pref) {
    // https://docs.meteor.com/api/collections.html#modifiers
    // Without using $-operators, a modifier is interpreted as a literal document,
    // and completely replaces whatever was previously in the database.
    // Find the document with ID 'event.id' and completely replace it.
    Preferences.update({_id: Meteor.userId()}, pref, function (err, docsChanged) {
      if (err) console.log(err);
      // console.log("event had id: " + event.id);
      // console.log(docsChanged + " documents were changed");
      })
  },
  // Change a user's username. Use this instead of updating the database
  // directly. The operation will fail if there is an existing user with a
  // username only differing in case.
  'updateUsername'(newUsername) {
    try {
      Accounts.setUsername(Meteor.userId(), newUsername);
    } catch (e) {
      return e;
    }
  }
});
