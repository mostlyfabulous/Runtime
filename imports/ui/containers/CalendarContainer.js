import { withTracker } from 'meteor/react-meteor-data';
import Runs from '/imports/api/runs';
import Weather from '/imports/api/weather';
import Calendar from '../components/Calendar.js'

const CalendarContainer = withTracker( () => {
  // const UserRuns = new Mongo.Collection('user');
  const runHandle = Meteor.subscribe('runs');
  const loadingRuns = !runHandle.ready();
  const runs = Runs.find().fetch();
  const weatherHandle = Meteor.subscribe('weather');
  const loadingWeather = !weatherHandle.ready();
  const weather = Weather.find().fetch();
  // const runs = Runs.find({owner: this.userId}).fetch();
  const runsExists = !loadingRuns && !!runs;
  const weatherExists = !loadingWeather && !!weather;
  return {
    loadingRuns,
    runsExists,
    runEvents: runsExists ? runs : [],
    loadingWeather,
    weatherEvents: weatherExists ? weather : [],
  };
})(Calendar);

export default CalendarContainer;
