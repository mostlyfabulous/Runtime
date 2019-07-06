import { withTracker } from 'meteor/react-meteor-data';
import Preferences from '/imports/api/preferences';
import UserPref from '../components/preferences/UserPref.js'

const PreferencesContainer = withTracker( () => {
  // const UserRuns = new Mongo.Collection('user');
  const preferencesHandle = Meteor.subscribe('preferences');
  const loadingPreferences = !preferencesHandle.ready();
  const preferences = Preferences.find({_id: this.userId}).fetch();
  // const runs = Runs.find({owner: this.userId}).fetch();
  const preferencesExists = !loadingPreferences && !!preferences;
  return {
    loadingPreferences,
    preferencesExists,
    preferencesEvents: preferencesExists ? preferences : [],
  };
})(UserPref);

export default PreferencesContainer;
