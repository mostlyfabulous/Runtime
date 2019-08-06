import React from 'react';
//import UserPref from '../components/UserPref.js';
import { withAccount } from '../components/accounts/connector.js'
import MapContainer from '../containers/MapContainer.js';
import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper.js'
import {connect} from 'react-redux';


class Explore extends React.Component {

    render() {
      if (this.props.account.userId && this.props.gmaps) {
        return (
            <div className='body'>
                <div id='fullContent'>
                  <MapContainer apiKey={this.props.gmaps}/>

                </div>
            </div>
        )
      } else {
        return (
            <div className='body'>
                <div id='mainContent'>
                  <AccountsUIWrapper/>
                </div>
            </div>
        )
      }

    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const ExploreContainer = withAccount(Explore);

export default connect(mapStateToProps)(ExploreContainer);
