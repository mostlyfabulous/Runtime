import React from 'react';
import { getRunInfo, getOverallStats } from '../formatHelpers.js';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardHeader } from 'reactstrap';

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

        <CardText>
        <b> Total Distance: </b> {stats.totalDist} km
        <br />
        <b> Total Time: </b> {stats.totalTime}
        <br />
        <b> Average Speed:  </b>{stats.avgSpeed} km/h
        <br />
        <br />

         {random.desc}

        {getRunInfo(random.run)}</CardText>

      </div>
    }
    return (
      <div>
        <Card>
        <CardHeader tag="h2">Lifetime Statistics:</CardHeader>
        <CardBody>


        {statInfo}
        </CardBody>
        </Card>
      </div>
    )
  }
}

export default HomeStats;
