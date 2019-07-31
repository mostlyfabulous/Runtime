import React from 'react';

const DATE_TO_WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getFormattedDate = (date) => {
    return DATE_TO_WEEKDAY[date.getDay()]+', '+(date.getMonth()+1)+'/'+date.getDate();
}

const getFormattedTime = (date) => {
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
    let speed = ""
    if (run.distance){
        dist = run.distance;
    }
    if (run.end){
        let date = new Date(run.end);
        end = ' to '+getFormattedTime(date);

        let duration = moment(run.end).diff(run.start, 'seconds');
        // speed = "Speed: "+ (dist/(duration/3600)).toFixed(2) +" km/h";
        speed = (dist/(duration/3600)).toFixed(2) +" km/h";
    }
    return <div>
        <h4>{run.title}</h4>
          <b> Date: </b> {day}
        <br />
          <b> Distance: </b> {dist} km
        <br />
          <b> Time: </b> {start} {end}
        <br />
          <b> Speed: </b> {speed}
    </div>
}

export const getOverallStats = (runs) => {
    let date = runs[0].start
    let stats = {day: getFormattedDate(date)};

    let distance = 0;
    let time = 0;
    let timeList = [];
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

        timeList[i] = "";

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

            timeList[i] = <span>
                Time: {moment.utc(duration*1000).format('HH:mm:ss')}
                <br />
                Speed: {speed} km/h
            </span>;
        }
    };

    stats.totalDist = distance.toFixed(2);
    stats.totalTime = 0;
    stats.timeList = timeList;

    if (timeList.length > 0) {
        let average = calcSpeedDist/(time/3600);
        let formattedTime = convertSeconds(time);

        stats.totalTime = formattedTime + " (h:m:s)";
        stats.avgSpeed = average.toFixed(2);
    }

    let bests;
    if (runs.length > 0) {
        bests = {topDist: {
            desc: "Most distance travelled: ",
            run: topDist
        }};
        if (topTimeRun) {
            bests.topTime = {
                desc: "Longest Time Spent: ",
                run: topTimeRun
            }
        }
        if (topSpeedRun) {
            bests.topSpeed = {
                desc: "Highest average speed: ",
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
