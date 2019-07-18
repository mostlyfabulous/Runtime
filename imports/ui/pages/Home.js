import React from 'react';
import NextRunInfoContainer from '../containers/nextRunInfoContainer'
import HomeStatsContainer from '../containers/HomeStatsContainer'

class Home extends React.Component {
    render() {
        return (
            <div className='body'>
                <div id='sideMenu'>
                    <NextRunInfoContainer/>
                    <HomeStatsContainer/>
                </div>
                <div id='mainContent'>
                </div>
            </div>
        )
    }
}

export default Home;