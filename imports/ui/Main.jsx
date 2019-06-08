import React from 'react';
import Info from './Info.jsx';
import Calendar from './Calendar.jsx';

class Main extends React.Component {
    render() {
        return (
            <div className='body'>
                <Info/>
                <Calendar/>
            </div>
        )
    }
}

export default Main;