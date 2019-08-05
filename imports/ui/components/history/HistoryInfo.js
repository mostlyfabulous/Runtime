import React, { Component } from 'react';
import {connect} from 'react-redux';

import {getRunInfo, getOverallStats} from '../formatHelpers.js'

class HistoryInfo extends React.Component {

    render() {
        let details = <p>Click on the chart to see more details.</p>;

        if (this.props.info.length !== 0) {
            let info = this.props.info;
            let stats = getOverallStats(this.props.info);
            if (stats !== null) {
                let timeDependant = ""
                if (stats.avgSpeed > 0){
                    timeDependant = <div>
                        <b>Average speed:</b> {stats.avgSpeed} km/h
                        <br />
                        <b>Total time spent:</b> {stats.totalTime}
                    </div>
                }
                console.log(info);
                
                details = <div>
                    <h2>{stats.day}</h2>
                    <b>Total distance travelled:</b> {stats.totalDist} km 
                    {timeDependant}
                    {info.map((run, index) => (
                        <div key = {index}>
                            <br />
                            {getRunInfo(run)}
                        </div>
                    ))}
                </div>;
            } else 
                details = <div>
                    {details}
                    <br />
                    No runs on this day.
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