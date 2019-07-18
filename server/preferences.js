import { Meteor } from 'meteor/meteor';
import Preferences from '/imports/api/preferences';

Meteor.publish('preferences', function() {
 // args publish needs goes in: function(args)
  if (!this.userId) {
    // console.log("No userId supplied");
    return this.ready();
  }
  if (Preferences.find({_id: this.userId}).fetch().length === 0) {
  let pref = {_id: this.userId, clouds: 50, min_temp: 10, max_temp: 20, precipitation: 25};
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

// const handle = Meteor.subscribe('user.runs', args);
// when passing args is optional and used
// to pass a parameter to publish
// https://guide.meteor.com/data-loading.html#fetching
