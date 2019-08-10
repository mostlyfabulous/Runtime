import React from 'react';
import postscribe from 'postscribe'
import { withAccount } from '../components/accounts/connector.js'
import MapContainer from '../containers/MapContainer.js';
import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper.js'
import {connect} from 'react-redux';


class Explore extends React.Component {
  componentDidMount () {
    postscribe('#fullContent', '<script src="https://darksky.net/map-embed/@temperature,49.127,-122.506,9.js?embed=true&timeControl=false&fieldControl=true&defaultField=temperature&defaultUnits=_c"></script>')

}
    render() {
      if (this.props.account.userId && this.props.gmaps) {
        return (
            <div className='body'>
                <div id='fullContent'>

                </div>
            </div>
        )
      } else {
        return (
            <div className='body'>
                <div id='mainContent'>
                  <h1>Please log in</h1>
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
