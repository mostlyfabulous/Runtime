import React, { Component } from 'react';
import {connect} from 'react-redux';

import {getRunInfoHistPage, getOverallStats} from '../formatHelpers.js'
import { Card, CardBody, CardHeader } from 'reactstrap';

class HistoryInfo extends React.Component {

    render() {
        let header = "Run Information";
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

                details = <div>
                    <b>Total distance travelled:</b> {stats.totalDist} km
                    {timeDependant}
                    {info.map((run, index) => (
                        <div key = {index}>
                            <br />

                            {getRunInfoHistPage(run, index)}

                        </div>
                    ))}
                </div>;
                header = stats.day;
            }
        }
        return (
            <div>
                <Card>
                    <CardHeader tag="h2">{header}</CardHeader>
                    <CardBody>
                        {details}
                    </CardBody>
                </Card>
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
