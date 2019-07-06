import React from 'react';
import { connect } from 'react-redux';

import HistoryChartContainer from '../containers/HistoryChartContainter';
import HistoryInfo from '../components/history/HistoryInfo';

class History extends React.Component {
    render() {
        return (
            <div className='body'>
                <div id='sideMenu'>
                    <HistoryInfo/>
                </div>
                <div id='mainContent'>
                    <HistoryChartContainer/>
                </div>
            </div>
        )
    }
}

export default History;
