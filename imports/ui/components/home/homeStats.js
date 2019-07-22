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
        Total Distance: {stats.totalDist} km
        <br />
        Total Time: {stats.totalTime}
        <br />
        Average Speed: {stats.avgSpeed} km/h
        <br />
        <br />
        {random.desc} {getRunInfo(random.run)}
      </div>
    }
    return (
      <div>
        <h1>Lifetime Statistics:</h1>
        {statInfo}
      </div>
    )
  }
}

export default HomeStats;