import React from 'react';
import { getRunInfo, getOverallStats } from '../formatHelpers.js';

class HomeStats extends React.Component {
  chooseRandomStat(stats) {
    let keyArray = Object.keys(stats)
    let key = Math.floor((Math.random()*keyArray.length))
    return stats[keyArray[key]];
  }

  render() {
    let statInfo = "";
    let runs = this.props.runs;

    if (runs.length > 0) {
      let stats = getOverallStats(runs);
      let random = this.chooseRandomStat(stats.bests);
      statInfo = <div>
        <b> Total Distance: </b> {stats.totalDist} km
        <br />
        <b> Total Time: </b> {stats.totalTime}
        <br />
        <b> Average Speed:  </b>{stats.avgSpeed} km/h
        <br />
        <br />
        <b> {random.desc} </b> {getRunInfo(random.run)}
      </div>
    }
    return (
      <div>
        <h2>Lifetime Statistics:</h2>
        {statInfo}
      </div>
    )
  }
}

export default HomeStats;
