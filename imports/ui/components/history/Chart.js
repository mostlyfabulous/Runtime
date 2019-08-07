import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getHistoryChartData, historyInfo } from '../../actions/index';
import { connect } from 'react-redux';
import { Card, CardBody, CardText, CardHeader } from 'reactstrap';

class Chart extends Component {
    componentDidMount() {
        this.props.getHistoryChartData(this.props.runs);
    }
    handleClick(elems) {
        if (elems.length !== 0){
            this.props.historyInfo(elems[0]._index);
        }
    }
    render() {
        return (
            <div>
                <Card>
                    <CardHeader tag='h2'>Run History <i className="history icon"></i></CardHeader>
                    <CardBody>
                        <Bar
                            data={this.props.data}
                            onElementsClick={elems => this.handleClick(elems)}
                            options={{
                                legend: {
                                    display: false
                                },
                                maintainAspectRatio: true,
                                scales: {
                                    xAxes: [{
                                        stacked: true,
                                        label: 'Day',
                                        griLines: {
                                            display: false
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Last 7 days'
                                        }
                                    }],
                                    yAxes: [{
                                        stacked: true,
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Distance (km)'
                                        },
                                        gridLines: {
                                            display: false
                                        },
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }}
                        /> 
                    </CardBody>
                </Card>    
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.runHistory,
        info: state.historyInfo
    }
}

export default connect(mapStateToProps, {getHistoryChartData, historyInfo}) (Chart);
