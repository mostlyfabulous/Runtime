import React from 'react';
//import UserPref from '../components/UserPref.js';
import UserContainer from '../containers/UserContainer.js';
import {connect} from 'react-redux';


class Preferences extends React.Component {
    render() {
      // set logged in to true for now

      if (/*this.props.loggedIn*/ true === true) {
        return (
            <div className='body'>
                <div id='mainContent'>
                    <UserContainer/>
                </div>
            </div>
        )
      } else {
        return (
            <div className='body'>
                <div id='mainContent'>
                    <Login/>
                </div>
            </div>
        )
      }

    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.LoggedIn
    };
}

export default connect(mapStateToProps)(Preferences);
