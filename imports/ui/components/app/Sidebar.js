import React from 'react';
import SideListElement from './SideListElement';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
             <img src='./Runtime_logo/logo_clear.png' width='60%'/>
                <h1>Runtime</h1>
                <ul>
                    <SideListElement title='Home' page='home'/>
                    <SideListElement title='Plan A Run' page='plan'/>
                    <SideListElement title='Run History' page='history'/>
                    <SideListElement title='Manage Preferences' page='preferences'/>
                    <SideListElement title='Explore' page='explore'/>
                    <SideListElement title='About Us' page='aboutus'/>
                </ul>
                <img src='./DarkSky_badges/DarkSky_badge_dark.png' id='badge'/>
            </div>
        )
    }
}

export default Sidebar;
