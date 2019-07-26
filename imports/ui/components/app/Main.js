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

    if (this.props.preferencesEvents.length > 0) {
      if (this.props.account.userId && prevProps.account.userId !== this.props.account.userId) {
        // on log in, start subscriptions
      let {clouds, min_temp, max_temp,
        precipitation, city} = this.props.preferencesEvents[0];
        this.props.loadPreferences();
        this.props.loadRunEvents(this.props.account.userId);
        this.props.loadWeatherEvents(city); // city may not be available
        }
        if (prevProps.preferencesEvents.length > 0) {
          if (this.props.preferencesEvents[0].city !== prevProps.preferencesEvents[0].city) {
           // if location changes through prefs, stop old sub and start a new one
           this.props.stopSubscription(WEATHER_SUB);
           let {clouds, min_temp, max_temp,
             precipitation, city} = this.props.preferencesEvents[0];
             this.props.loadWeatherEvents(city);
           }
         }
      } else if (!this.props.account.userId && prevProps.account.userId !== this.props.account.userId) {
        // on logout, stop subscriptions
        this.props.stopSubscription(WEATHER_SUB);
        this.props.stopSubscription(RUNS_SUB);
        this.props.stopSubscription(PREFERENCES_SUB);
      }
    // once preferences are loaded, load weather events
    if (prevProps.preferencesReady !== this.props.preferencesReady) {
      let {clouds, min_temp, max_temp,
        precipitation, city} = this.props.preferencesEvents[0];
      this.props.loadWeatherEvents(city);
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
        calendarReady: state.calendar.calendarReady,
        calendarSubscriptionStopped: state.calendar.calendarSubscriptionStopped,
        weatherReady: state.weatherMiddleware.weatherReady,
        weatherSubscriptionStopped: state.weatherMiddleware.weatherSubscriptionStopped,
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
