import { Meteor } from 'meteor/meteor';
import Preferences from '/imports/api/preferences';

Meteor.publish('preferences', function() {
  if (!this.userId) {
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
    Preferences.update({_id: Meteor.userId()}, pref, function (err, docsChanged) {
      if (err) console.log(err);
      })
  },
  'updateUsername'(newUsername) {
    try {
      Accounts.setUsername(Meteor.userId(), newUsername);
    } catch (e) {
      return e;
    }
  }
});
