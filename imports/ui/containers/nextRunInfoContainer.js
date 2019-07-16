import { withTracker } from 'meteor/react-meteor-data';
import Runs from '/imports/api/runs';
import nextRun from '../components/home/nextRun.js'


let date = new Date();

const NextRunInfoContainer = withTracker( () => {
  const runHandle = Meteor.subscribe('upcoming');
  const loadingRuns = !runHandle.ready();
  const runs = Runs.find({start: {$gte: date}, owner: Meteor.userId()}, {sort: {start: 1}}, {limit:1}).fetch();
  const runsExists = !loadingRuns && !!runs;
  return {
    loadingRuns,
    runsExists,
    runEvents: runsExists ? runs : []
  };
})(nextRun);

export default NextRunInfoContainer;