import React from 'react';
import {connect} from 'react-redux';
import { withAccount } from '../accounts/connector.js'
import Home from '../../pages/Home';
import RunPlan from '../../pages/RunPlan';
import History from '../../pages/History';
import Preferences from '../../pages/Preferences';
import ExploreContainer from '../../pages/Explore';

import { loadWeatherEvents, WEATHER_SUB, loadRunEvents, RUNS_SUB,
  loadPreferences, PREFERENCES_SUB, clearGoogleEvents } from '../../actions/index';
import { stopSubscription } from 'meteor-redux-middlewares';
import {bindActionCreators} from 'redux';

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gmaps: "",
      backgroundColor: '#fff',
    }
    Meteor.call('getGoogleKeys', function(err, res) {
      if (err) {console.log(err);}
      if (res) {
        this.setState({gmaps: res.api});
      }}.bind(this));
  }

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
        let {clouds, min_temp, max_temp,
          precipitation, city} = this.props.preferencesEvents[0];
        this.props.loadPreferences();
        this.props.loadRunEvents(this.props.account.userId);
        this.props.loadWeatherEvents(city, {min_temp, max_temp}); // city may not be available
        }
        if (prevProps.preferencesEvents.length > 0) {
          if (this.props.preferencesEvents[0].city !== prevProps.preferencesEvents[0].city) {
           this.props.stopSubscription(WEATHER_SUB);
           let {clouds, min_temp, max_temp,
             precipitation, city} = this.props.preferencesEvents[0];
             this.props.loadWeatherEvents(city, {min_temp, max_temp});
           }
         }
      }
    // once preferences are loaded, load weather events
    if (prevProps.preferencesReady !== this.props.preferencesReady) {
      let {clouds, min_temp, max_temp,
        precipitation, city, background} = this.props.preferencesEvents[0];
      this.props.loadWeatherEvents(city, {min_temp, max_temp});

      // then get backgroundColor
      this.setState({backgroundColor: this.props.preferencesEvents[0].background})
    }

    if (!this.props.account.userId && prevProps.account.userId !== this.props.account.userId) {
      this.props.stopSubscription(WEATHER_SUB);
      this.props.stopSubscription(RUNS_SUB);
      this.props.stopSubscription(PREFERENCES_SUB);
      this.props.clearGoogleEvents();}
  }


  render() {
    let body =<RunPlan />;
    if (this.props.page === 'home') {
      body =<Home />;
    } else if (this.props.page === 'history') {
      body =<History/>;
    } else if (this.props.page === 'preferences') {
      body = <Preferences/>;
    } else if (this.props.page === 'explore') {
      body = <ExploreContainer gmaps={this.state.gmaps}/>;

    }
    return (
      <div style={{backgroundColor : this.state.backgroundColor}}>
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
      stopSubscription,
      clearGoogleEvents
    },
    dispatch
  );
}

const MainContainer = withAccount(Main);

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
