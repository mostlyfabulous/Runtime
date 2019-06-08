import React from 'react';
import Info from './Info.jsx';
import Calendar from './Calendar.jsx';

class Main extends React.Component {
    render() {
        return (
            <div className='body'>
                <div id='sideMenu'>
                    <Info/>
                </div>
                <div id='mainContent'>
                    <Calendar/>
                </div>
            </div>
        )
    }
}

export default Main;