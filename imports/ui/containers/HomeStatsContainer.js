import { withTracker } from 'meteor/react-meteor-data';
import Runs from '/imports/api/runs';
import HomeStats from '../components/home/homeStats.js';

const HomeStatsContainer = withTracker( () => {
  const runHandle = Meteor.subscribe('runs');
  const loadingRuns = !runHandle.ready();
  const runs = Runs.find().fetch();
  const runsExists = !loadingRuns && !!runs;
  return {
    loadingRuns,
    runsExists,
    runEvents: runsExists ? runs : [],
  };
})(HomeStats);

export default HomeStatsContainer;