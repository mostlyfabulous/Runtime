import React from 'react';
import SideListElement from './SideListElement';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <h1>Runtime</h1>
                <ul>
                    <li><SideListElement title='Home' page='home'/></li>
                    <li><SideListElement title='Plan A Run' page='plan'/></li>
                    <li><SideListElement title='Run History' page='history'/></li>
                    <li><SideListElement title='Manage Preferences' page='preferences'/></li>
                    <li><SideListElement title='Explore' page='explore'/></li>
                </ul>
            </div>
        )
    }
}

export default Sidebar;
