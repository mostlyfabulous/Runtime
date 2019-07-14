import React, { Component } from 'react';
import {connect} from 'react-redux';

class HistoryInfo extends React.Component {

    overallStats() {
        let info = this.props.info;

        const dateDayToWeekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let date = info[0].start

        let stats = {day: dateDayToWeekDay[date.getDay()]+' '+(date.getMonth()+1)+'/'+date.getDate()};

        let distance = 0;
        let time = 0;
        let timeList = [];
        let calcSpeedDist = 0;

        for (let i = 0; i < info.length; i++){
            distance += run.distance;
            timeList[i] = "";

            if (run.end) {
                calcSpeedDist += run.distance;
                let end = new Date(run.end);
                let duration = moment(end).diff(run.start, 'seconds');
                time += duration;
                timeList[i] = ("Time: "+moment.utc(duration*1000).format('HH:mm:ss'));
            }
        };

        stats.totalDist = distance.toFixed(2);
        stats.totalTime = null;
        stats.timeList = timeList;

        if (timeList.length > 0) {
            let average = calcSpeedDist/(time/3600);
            let formattedTime = moment.utc(time*1000).format('HH:mm:ss');

            stats.totalTime = formattedTime + " (h:m:s)";
            stats.avgSpeed = average.toFixed(2);
        }
        return stats;
    }

    render() {
        let details = <p>Click on the chart to see more details.</p>;

        if (this.props.info.length !== 0) {
            let info = this.props.info;
            let stats = this.overallStats();

            let timeDependant = ""
            if (stats.avgSpeed > 0){
                timeDependant = <div>
                    Average speed: {stats.avgSpeed} km/h
                    <br />
                    Total time spent: {stats.totalTime}
                </div>
            }
            
            details = <div>
                <h1>{stats.day}</h1>
                Total distance travelled: {stats.totalDist} km 
                {timeDependant}
                <br />
                {info.map((run, index) => (
                    <div key = {index}>
                        <h3>Run #{index+1}</h3>
                        Distance: {run.distance} km
                        <br />
                        {stats.timeList[index]}
                    </div>
                ))}
            </div>;
        }
        return (
            <div>
                {details}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.historyInfo
    }
}

export default connect(mapStateToProps)(HistoryInfo);