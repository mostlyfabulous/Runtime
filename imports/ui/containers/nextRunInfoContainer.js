import { withTracker } from 'meteor/react-meteor-data';
import Runs from '/imports/api/runs';
import sideInfo from '../components/home/sideInfo'


let date = new Date();

const NextRunInfoContainer = withTracker( () => {
  const runHandle = Meteor.subscribe('upcoming');
  const loadingNext = !runHandle.ready();
  const runs = Runs.find({start: {$gte: date}, owner: Meteor.userId()}, {sort: {start: 1}}, {limit:1}).fetch();
  const nextExists = !loadingNext && !!runs;
  return {
    loadingNext,
    nextExists,
    nextEvent: nextExists ? runs : []
  };
})(sideInfo);

export default NextRunInfoContainer;