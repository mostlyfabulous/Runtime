import React from 'react';
import postscribe from 'postscribe'
//import UserPref from '../components/UserPref.js';
import { withAccount } from '../components/accounts/connector.js'
import MapContainer from '../containers/MapContainer.js';
import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper.js'
import {connect} from 'react-redux';


class Explore extends React.Component {
  loadMap () {
    postscribe('#fullContent', '<script src="https://darksky.net/map-embed/@temperature,49.127,-122.506,9.js?embed=true&timeControl=false&fieldControl=true&defaultField=temperature&defaultUnits=_c"></script>')

}
  // <MapContainer apiKey={this.props.gmaps}/>
    render() {
      if (this.props.account.userId && this.props.gmaps) {
        this.loadMap();
        return (
            <div className='body'>
                <div id='fullContent'>

                </div>
            </div>
        )
      } else {
        return (
            <div className='body'>
                <div id='centerContent'>
                  <h2>Please log in</h2>
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
