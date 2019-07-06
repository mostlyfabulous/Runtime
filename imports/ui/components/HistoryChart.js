import React, { Component } from 'react';
import Chart from './Chart';

class HistoryChart extends Component {
    component
    render() {
        if (this.props.loadingRuns === false && this.props.runsExists === true){
            return (
                <Chart runs={this.props.runEvents}/>
            );
        }
        else return (<div className='spinner'/>);
    }
}

export default HistoryChart;
