import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getHistoryChartData, historyInfo } from '../../actions/index';
import { connect } from 'react-redux';

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
                <h2>Run History</h2>
                <Bar
                    data={this.props.data}
                    onElementsClick={elems => this.handleClick(elems)}
                    options={{

                        maintainAspectRatio: true,
                        scales: {
                            xAxes: [{
                                label: 'Day',
                                griLines: {
                                    display: false
                                }
                            }],
                            yAxes: [{
                                label: 'km',
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
