import React from 'react';
//import UserPref from '../components/UserPref.js';
import { withAccount } from '../components/accounts/connector.js'
import MapContainer from '../containers/MapContainer.js';
import {connect} from 'react-redux';


class Explore extends React.Component {
    render() {
      // set logged in to true for now

      if (/*this.props.loggedIn*/ true === true) {
        return (
            <div className='body'>
                <div id='mainContent'>
                    <MapContainer/>
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

const ExploreContainer = withAccount(Explore);

export default connect(mapStateToProps)(ExploreContainer);
