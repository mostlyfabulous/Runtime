import { withTracker } from 'meteor/react-meteor-data';
import Runs from '/imports/api/runs';
import sideInfo from '../components/home/sideInfo.js'

let date = new Date();

const HomeStatsContainer = withTracker( () => {
  const runHandle = Meteor.subscribe('past');
  const loadingRuns = !runHandle.ready();
  const runs = Runs.find({start: {$lte: date}, owner: Meteor.userId()}).fetch();
  const runsExists = !loadingRuns && !!runs;
  return {
    loadingRuns,
    runsExists,
    runEvents: runsExists ? runs : [],
  };
})(sideInfo);

export default HomeStatsContainer;