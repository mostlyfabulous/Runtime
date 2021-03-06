import React from 'react';
import { getRunInfo, getOverallStats } from '../formatHelpers.js';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardHeader } from 'reactstrap';
import { Progress } from 'reactstrap';
import { withAccount } from '../accounts/connector.js'

const userGuide = <>
  <CardText tag="div">
    <b>Please create an account or login to use the website.</b>
    <br/>You may use the following credentials if you prefer:
    <br/>
    <br/><b>Username:</b> default
    <br/><b>Password:</b> 123456
  </CardText>
</>

class HomeStats extends React.Component {
  chooseRandomStat(stats) {
    let keyArray = Object.keys(stats)
    let key = Math.floor((Math.random()*keyArray.length))
    return stats[keyArray[key]];
  }

  render() {
    let statInfo = "";
    let runs = this.props.runs;
    let guide = (this.props.account.user) ? <></> : userGuide;
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

      statInfo = <>

        <CardText tag="div">
        <b> Total Distance: </b> {stats.totalDist} km
        <br />
        <b> Total Time: </b> {stats.totalTime}
        <br />
        <b> Average Speed:  </b>{stats.avgSpeed} km/h
        <br />
        <Progress color = {barColor} value={barValue}> {barText} </Progress>
        <br />

         {random.desc}

         <div className='indent'>
           <br/>
          {getRunInfo(random.run)}
        </div>
        </CardText>

      </>
    }



    return (
      <>
        <Card>
        <CardHeader tag="h2">Lifetime Statistics:</CardHeader>
        <CardBody>
        {guide}
        {statInfo}
        </CardBody>
        </Card>
      </>
    )
  }
}
const HomeStatsContainer = withAccount(HomeStats);

export default HomeStatsContainer;
