import React, { Component } from 'react';
import Chart from './Chart';
import { Spinner } from 'reactstrap';

class HistoryChart extends Component {
    component
    render() {
        if (this.props.loadingRuns === false && this.props.runsExists === true){
            return (
                <Chart runs={this.props.runEvents}/>
            );
        }
        else return <div> <Spinner color="info" style={{ width: '10rem', height: '10rem' }} /> </div>;
    }
}

export default HistoryChart;
