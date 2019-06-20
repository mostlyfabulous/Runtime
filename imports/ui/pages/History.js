import React from 'react';
import HistoryChart from '../HistoryChart';

class History extends React.Component {
    render() {
        return (
            <div className='body'>
                <div id='sideMenu'>
                    Info
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