import React from 'react';
import { getRunInfo, getOverallStats } from '../formatHelpers.js';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardHeader } from 'reactstrap';
import { Progress } from 'reactstrap';

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
      let barColor = "success"
      let barText = "";
      let barValue = stats.totalDist;

      if (stats.totalDist < 500) {
        barColor = "success";
        barText = "Level 1/4";
        barValue = stats.totalDist/500;
      } else if (stats.totalDist < 2000) {
        barColor = "info";
        barText = "Level 2/4";
        barValue = stats.totalDist/2000;
      } else if (stats.totalDist < 10000) {
        barColor = "warning";
        barText = "Level 3/4";
        barValue = stats.totalDist/10000;
      } else if (stats.totalDist < 50000){
        barColor = "danger";
        barText = "Level 4/4";
        barValue = stats.totalDist/50000;
      } else {
        barColor = "danger";
        barText = "TOP LEVEL ACHIEVED!";
      }

      barValue = barValue*100;
      console.log('bar val');
      console.log(barValue);

      statInfo = <div>

        <CardText>
        <b> Total Distance: </b> {stats.totalDist} km
        <br />
        <b> Total Time: </b> {stats.totalTime}
        <br />
        <b> Average Speed:  </b>{stats.avgSpeed} km/h
        <br />
        <br />
        <Progress color = {barColor} value={barValue}> {barText} </Progress>
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
