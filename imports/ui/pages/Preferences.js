import React from 'react';
import UserContainer from '../containers/UserContainer.js';
import {connect} from 'react-redux';


class Preferences extends React.Component {
    render() {
        return (
            <div className='body'>
                <div id='centerContent'>
                    <UserContainer/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.LoggedIn
    };
}

export default connect(mapStateToProps)(Preferences);
