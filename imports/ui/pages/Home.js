import React from 'react';
import NextRunInfoContainer from '../containers/nextRunInfoContainer'
import HomeStatsContainer from '../containers/HomeStatsContainer'

class Home extends React.Component {
    render() {
        return (
            <div className='body'>
                <div id='sideMenuHome'>
                    <HomeStatsContainer/>
                </div>
                <div id='mainContentHome'>
                    <NextRunInfoContainer/>
                </div>
            </div>
        )
    }
}

export default Home;
