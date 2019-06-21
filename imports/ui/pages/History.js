import React from 'react';
import HistoryChart from '../HistoryChart';
import HistoryInfo from '../HistoryInfo';
import { connect } from 'react-redux';

class History extends React.Component {
    render() {
        return (
            <div className='body'>
                <div id='sideMenu'>
                    <HistoryInfo/>
                </div>
                <div id='mainContent'>
                    Graph
                    <HistoryChart/>
                </div>
            </div>
        )
    }
}

export default History;