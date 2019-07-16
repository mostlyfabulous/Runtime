import React from 'react';
import NextRunInfoContainer from '../containers/nextRunInfoContainer'

class Home extends React.Component {
    render() {
        return (
            <div className='body'>
                <div id='sideMenu'>
                    <NextRunInfoContainer/>
                </div>
                <div id='mainContent'>
                </div>
            </div>
        )
    }
}

export default Home;