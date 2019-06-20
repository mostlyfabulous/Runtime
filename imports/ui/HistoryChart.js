import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Run #1',
        backgroundColor:'blue',
        data: [3,1,4,0,6,2,3]
      },
      {
        label: 'Run #2',
        backgroundColor:'green',
        data: [3,10,1,0,0,1,2]
      },
      {
        label: 'Run #3',
        backgroundColor:'red',
        data: [2,3,2,3,2,3,2]
      }
    ]
  };

class HistoryChart extends React.Component {
    render() {
        return (
            <div>
                <Bar
                    data={data}
                    width={100}
                    height={50}
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

export default HistoryChart;