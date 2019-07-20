import React from 'react';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { loadPastRunEvents } from '../../actions/index';
import { getRunInfo, getOverallStats } from '../formatHelpers.js';

class HomeStats extends React.Component {
  chooseRandomStat(stats) {
    let keyArray = Object.keys(stats)
    let key = Math.floor((Math.random()*keyArray.length))
    return stats[keyArray[key]];
  }
  componentDidMount() {
      let date = new Date();
      this.props.loadPastRunEvents(date);
  }

  render() {
    console.log(this.props.runEvents)

    let runs = this.props.runEvents;
    let stats = getOverallStats(runs);
    let random = this.chooseRandomStat(stats.bests)
    return (
      <div>
        <h1>Lifetime Statistics:</h1>
        Total Distance: {stats.totalDist} km
        <br />
        Total Time: {stats.totalTime}
        <br />
        Average Speed: {stats.avgSpeed} km/h
        <br />
        <br />
        {random.desc} {getRunInfo(random.run)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    runEvents: state.calendar.calendarEvents,
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        loadPastRunEvents
      },
      dispatch
    );
  };

export default connect (mapStateToProps, mapDispatchToProps)(HomeStats);