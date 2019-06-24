import React from 'react';
import { connect } from 'react-redux';

import HistoryChart from '../components/HistoryChart';
import HistoryInfo from '../components/HistoryInfo';

class History extends React.Component {
    render() {
        return (
            <div className='body'>
                <div id='sideMenu'>
                    <HistoryInfo/>
                </div>
                <div id='mainContent'>
                    <HistoryChart/>
                </div>
            </div>
        )
    }
}

export default History;
