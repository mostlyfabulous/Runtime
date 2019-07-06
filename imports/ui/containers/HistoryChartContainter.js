import { withTracker } from 'meteor/react-meteor-data';
import Runs from '/imports/api/runs';
import HistoryChart from '../components/HistoryChart.js'


let date = new Date();
let pastDate = new Date();
pastDate.setDate(pastDate.getDate()-6);

const HistoryChartContainer = withTracker( () => {
  const runHandle = Meteor.subscribe('week');
  const loadingRuns = !runHandle.ready();
  const runs = Runs.find({start: {$gte: pastDate, $lt: date}, owner: Meteor.user()._id}, {sort: {start: 1}}).fetch();
  const runsExists = !loadingRuns && !!runs;
  return {
    loadingRuns,
    runsExists,
    runEvents: runsExists ? runs : []
  };
})(HistoryChart);

export default HistoryChartContainer;