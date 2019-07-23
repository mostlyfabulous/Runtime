import React, { Component } from 'react';
import Topbar from '../app/Topbar';
class TopbarHandle extends Component {
  component
  render() {
    if (this.props.loadingPreferences === false && this.props.preferencesExists === true) {
        return (
            <Topbar preferences={this.props.preferencesEvents}/>
        );
    }
    else return "";
  }
}

  export default TopbarHandle;