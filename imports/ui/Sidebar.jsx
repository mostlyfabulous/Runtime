import React from 'react';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <ul>
                    <li>Home</li>
                    <li id='current'>Plan A Run</li>
                    <li>Run History</li>
                    <li>Manage Preferences</li>
                    <li>Explore</li>
                </ul>
            </div>
        )
    }
}

export default Sidebar;