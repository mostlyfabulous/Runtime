import { withTracker } from 'meteor/react-meteor-data';
import Preferences from '/imports/api/preferences';
import TopbarHandle from '../components/app/TopbarHandle';

const TopBarContainer = withTracker( () => {
  const preferencesHandle = Meteor.subscribe('preferences');
  const loadingPreferences = !preferencesHandle.ready();
  const preferences = Preferences.find({_id: Meteor.userId()}).fetch();
  const preferencesExists = !loadingPreferences && !!preferences;
  return {
    loadingPreferences,
    preferencesExists,
    preferencesEvents: preferencesExists ? preferences : [],
  };
})(TopbarHandle);

export default TopBarContainer;
