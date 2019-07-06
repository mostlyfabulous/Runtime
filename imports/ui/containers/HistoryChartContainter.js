import { withTracker } from 'meteor/react-meteor-data';
import Runs from '/imports/api/runs';
import HistoryChart from '../components/HistoryChart.js'

const HistoryChartContainer = withTracker( () => {
  const runHandle = Meteor.subscribe('week');
  const loadingRuns = !runHandle.ready();
  const runs = Runs.find().fetch();
  const runsExists = !loadingRuns && !!runs;
  return {
    loadingRuns,
    runsExists,
    runEvents: runsExists ? runs : []
  };
})(HistoryChart);

export default HistoryChartContainer;