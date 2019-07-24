import React, { Component } from 'react';

import PrefEditor from './PrefEditor';
class UserPref extends Component {

  render() {
    // console.log('user pref')
    // console.log(this.props.preferences)
    if (this.props.loadingPreferences === false && this.props.preferencesExists === true) {
        return (
            <PrefEditor preferences={this.props.preferences}/>
        );
    }
    else return (<div className='spinner'/>);
  }
}

  export default UserPref;
