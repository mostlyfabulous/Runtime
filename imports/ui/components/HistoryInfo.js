import React, { Component } from 'react';
import {connect} from 'react-redux';

class HistoryInfo extends React.Component {

    overallStats() {
        let info = this.props.info;

        let distance = 0;
        let time = 0;
        let timeUnits = 'min(s)'

        info.forEach(function (run) {
            distance += run.distance;
            time += run.duration;
        })

        let average = distance/(time/60)

        if (time > 60) {
            time = time/60
            timeUnits = 'hour(s)'
        }
        
        const dateDayToWeekDay = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        let date = info[0].day
        return {
            day: dateDayToWeekDay[date.getDay()]+' '+(date.getMonth()+1)+'/'+date.getDate(),
            avgSpeed: average.toFixed(2),
            totalDist: distance.toFixed(2),
            totalTime: time.toFixed(2),
            timeUnits: timeUnits
        }
    }

    render() {
        let details = <p>Click on the chart to see more details.</p>;

        if (this.props.info.length !== 0) {
            let info = this.props.info;
            let stats = this.overallStats();
            
            details = <div>
                <h1>{stats.day}</h1>
                Average speed: {stats.avgSpeed} km/h
                <br />
                Total distance travelled: {stats.totalDist} km
                <br /> 
                Total time spent: {stats.totalTime} {stats.timeUnits}
                <br />
                {info.map((run, index) => (
                    <div key = {index}>
                        <h3>Run #{index+1}</h3>
                        Duration: {run.duration} min
                        <br />
                        Distance: {run.distance} km
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