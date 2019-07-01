import { withTracker } from 'meteor/react-meteor-data';
import Runs from '/imports/api/runs';
import Calendar from '../components/Calendar.js'

const CalendarContainer = withTracker( () => {
  const runHandle = Meteor.subscribe('user.runs');
  const loadingRuns = !runHandle.ready();
  const runs = Runs.find({owner: this.userId}).fetch();
  const runsExists = !loadingRuns && !!runs;
  console.log(runHandle.ready());
  return {
    loadingRuns,
    runs,
    runsExists,
    runEvents: runsExists ? runs : []
  };
})(Calendar);

export default CalendarContainer;
