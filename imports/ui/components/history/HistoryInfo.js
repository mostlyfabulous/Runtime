import React, { Component } from 'react';
import {connect} from 'react-redux';

import {getFormattedDate, getOverallStats} from '../formatHelpers.js'

class HistoryInfo extends React.Component {

    render() {
        let details = <p>Click on the chart to see more details.</p>;

        if (this.props.info.length !== 0) {
            let info = this.props.info;
            let stats = getOverallStats(this.props.info);

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