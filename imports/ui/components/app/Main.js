import React from 'react';
import {connect} from 'react-redux';
import { withAccount } from '../accounts/connector.js'
import Home from '../../pages/Home';
import RunPlan from '../../pages/RunPlan';
import History from '../../pages/History';
import Preferences from '../../pages/Preferences';

import { loadWeatherEvents, WEATHER_SUB, loadRunEvents, RUNS_SUB,
  loadPreferences, PREFERENCES_SUB } from '../../actions/index';
import { stopSubscription } from 'meteor-redux-middlewares';
import {bindActionCreators} from 'redux';

class Main extends React.Component {

  componentDidMount() {
    this.props.loadPreferences();
    this.props.loadRunEvents(this.props.account.userId);
  }

  componentWillUnmount() {
    this.props.stopSubscription(WEATHER_SUB);
    this.props.stopSubscription(RUNS_SUB);
    this.props.stopSubscription(PREFERENCES_SUB);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.preferencesReady !== this.props.preferencesReady) {
      if (this.props.preferencesEvents) {
      let {clouds, min_temp, max_temp,
        precipitation, city} = this.props.preferencesEvents[0];
        console.log(city);
        this.props.loadWeatherEvents(city);
        }
      }
    }

  render() {
    let body =<RunPlan/>;
    if (this.props.page === 'home') {
      body =<Home/>;
    } else if (this.props.page === 'history') {
      body =<History/>;
    } else if (this.props.page === 'preferences') {
      body = <Preferences/>;
    }
    return (
      <div>
        {body}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        page: state.pages,
        preferencesReady: state.preferences.preferencesReady,
        preferencesEvents: state.preferences.preferencesEvents,
    };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadWeatherEvents,
      loadRunEvents,
      loadPreferences,
      stopSubscription
    },
    dispatch
  );
}

const MainContainer = withAccount(Main);

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
