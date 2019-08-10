import { Meteor } from 'meteor/meteor';
import Preferences from '/imports/api/preferences';

Meteor.publish('users', function() {
  if (!this.userId) {
    return this.ready();
  }
    let newPref = {min_temp: 10, max_temp: 20};
    Meteor.users.update({_id:this.userId}, { $set: {pref: newPref} });
  return Users.find({_id: this.userId});
});