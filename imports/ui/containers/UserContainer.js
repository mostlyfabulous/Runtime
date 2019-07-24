import { withTracker } from 'meteor/react-meteor-data';
import Preferences from '/imports/api/preferences';
import UserPref from '../components/preferences/UserPref.js'

const PreferencesContainer = withTracker( () => {
  const preferencesHandle = Meteor.subscribe('preferences');
  const loadingPreferences = !preferencesHandle.ready();
  const preferences = Preferences.find({_id: Meteor.userId()}).fetch();
  const preferencesExists = !loadingPreferences && !!preferences;
  return {
    loadingPreferences,
    preferencesExists,
    preferencesEvents: preferencesExists ? preferences : [],
  };
})(UserPref);

export default PreferencesContainer;
