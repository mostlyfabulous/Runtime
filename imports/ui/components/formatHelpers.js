import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardHeader } from 'reactstrap';

const DATE_TO_WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const barColors = ['#badeff','#f2aaaa', '#9ee4d9', '#f5f3cb'];

const getFormattedDate = (date) => {
    return DATE_TO_WEEKDAY[date.getDay()]+', '+(date.getMonth()+1)+'/'+date.getDate();
}

export const getFormattedTime = (date) => {
    let hours = date.getHours();
    let info = 'am';
    if (hours > 11) {
        info = 'pm';
        hours = hours-12;
    }
    let mins = "0"+date.getMinutes();
    return hours+":"+mins.slice(-2)+" "+info;
}

const convertSeconds = (time) => {
    let hours = 0;
    let mins = 0;
    console.log(time)
    hours = Math.floor(time/(60*60));
    time -= hours*3600;
    mins = Math.floor(time/60);
    time -= mins*60;
    console.log(hours)
    return hours+':'+mins+':'+time;
}

export const getRunInfo = (run) => {
    let day = getFormattedDate(run.start);
    let start = getFormattedTime(run.start);

    let dist = "";
    let end = "";
    let speed = "";
    let time = "";
    let difficulty = "";
    if (run.distance){
        dist = run.distance;
    }
    if (run.end){
        let date = new Date(run.end);
        end = ' to '+getFormattedTime(date);

        let duration = moment(run.end).diff(run.start, 'seconds');
        // speed = "Speed: "+ (dist/(duration/3600)).toFixed(2) +" km/h";
        speed = (dist/(duration/3600)).toFixed(2) +" km/h";
        time = moment.utc(duration*1000).format('HH:mm:ss');
    }

    if (run.difficulty) {
        difficulty = <span>
            <b> Difficulty: </b> {(run.difficulty === "") ? 0 : run.difficulty}/10
        </span>
    }
    return <div>
        <h4>{run.title}</h4>
        <b> Date: </b> {day}
        <br />
        <b> Distance: </b> {dist} km
        <br />
        <b> Time: </b> {start} {end}
        <br />
        <b> Length: </b> {time} (h:m:s)
        <br />
        <b> Speed: </b> {speed}
        <br />
         {difficulty}
    </div>
}

export const getRunInfoHistPage = (run, index) => {
    let day = getFormattedDate(run.start);
    let start = getFormattedTime(run.start);

    let dist = "";
    let end = "";
    let speed = "";
    let time = "";
    let difficulty = "";
    if (run.distance){
        dist = run.distance;
    }
    if (run.end){
        let date = new Date(run.end);
        end = ' to '+getFormattedTime(date);

        let duration = moment(run.end).diff(run.start, 'seconds');
        // speed = "Speed: "+ (dist/(duration/3600)).toFixed(2) +" km/h";
        speed = (dist/(duration/3600)).toFixed(2) +" km/h";
        time = moment.utc(duration*1000).format('HH:mm:ss');
    }

    if (run.difficulty) {
        difficulty = <span>
            <b> Difficulty: </b> {(run.difficulty === "") ? 0 : run.difficulty}/10
        </span>
    }

    let colour = 'chartInfo'+(index % barColors.length);
    return <div>
        <Card>
        <CardHeader tag="h4" className={colour}>{run.title}</CardHeader>
        <CardBody>
        <b> Date: </b> {day}
        <br />
        <b> Distance: </b> {dist} km
        <br />
        <b> Time: </b> {start} {end}
        <br />
        <b> Length: </b> {time} (h:m:s)
        <br />
        <b> Speed: </b> {speed}
        <br />
         {difficulty}
        </CardBody>
        </Card>
    </div>
}

export const getOverallStats = (runs) => {
    if (!runs[0]) {
        return null;
    }
    let date = runs[0].start
    let stats = {day: getFormattedDate(date)};

    let distance = 0;
    let time = 0;
    let calcSpeedDist = 0;
    let topDist = null;
    let topTime = 0;
    let topTimeRun = null;
    let topSpeed = 0;
    let topSpeedRun = null;

    for (let i = 0; i < runs.length; i++){
        let run = runs[i];
        distance += run.distance;
        if (topDist === null || run.distance > topDist.distance){
            topDist = run;
        }

        if (run.end) {
            calcSpeedDist += run.distance;
            let end = new moment(run.end);
            let duration = moment(end).diff(run.start, 'seconds');
            time += duration;
            if (duration > topTime){
              topTime = duration;
              topTimeRun = run;
            }

            let speed = (run.distance/(duration/3600)).toFixed(2);
            if (speed > topSpeed){
                topSpeed = speed;
                topSpeedRun = run;
            }
        }
    };

    stats.totalDist = distance.toFixed(2);
    stats.totalTime = 0;

    let average = calcSpeedDist/(time/3600);
    let formattedTime = convertSeconds(time);

    stats.totalTime = formattedTime + " (h:m:s)";
    stats.avgSpeed = average.toFixed(2);

    let bests;
    if (runs.length > 0) {
        bests = {topDist: {
            desc: <b>Most distance travelled: </b>,
            run: topDist
        }};
        if (topTimeRun) {
            bests.topTime = {
                desc: <b>Longest Time Spent: </b>,
                run: topTimeRun
            }
        }
        if (topSpeedRun) {
            bests.topSpeed = {
                desc: <b>Highest average speed: </b>,
                run: topSpeedRun
            }
        }
    } else bests = {
        desc: "",
        run: null
    }

    stats.bests = bests;

    return stats;
}
