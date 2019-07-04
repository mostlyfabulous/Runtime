import { withTracker } from 'meteor/react-meteor-data';
import Runs from '/imports/api/runs';
import Links from '/imports/api/links';
import Calendar from '../components/Calendar.js'

const CalendarContainer = withTracker( () => {
  // const UserRuns = new Mongo.Collection('user');
  const runHandle = Meteor.subscribe('runs');
  const loadingRuns = !runHandle.ready();
  const runs = Runs.find().fetch();
  // const runs = Runs.find({owner: this.userId}).fetch();
  const runsExists = !loadingRuns && !!runs;
  return {
    loadingRuns,
    runsExists,
    runEvents: runsExists ? runs : [],
  };
})(Calendar);

export default CalendarContainer;
