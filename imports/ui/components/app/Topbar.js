import React from 'react';
import { connect } from 'react-redux';
import { withAccount } from '../accounts/connector.js'
import AccountsUIWrapper from '../accounts/AccountsUIWrapper.js';
import {bindActionCreators} from 'redux'

class Topbar extends React.Component {

  getIcon(value) {
    let icon = './icons/'+value+'.png';
    return icon;
  }

  topbarInfo() {
    let weatherInfo = ""
    let city = "";
    if (this.props.weatherEvents.length > 0){
      let now = new Date();
      let data = this.props.weatherEvents.filter(weather =>
        (weather.start <= now) && (weather.end >= now));

      data = data[0];
      console.log(data);
      let prefs = this.props.preferences.preferencesEvents[0];

      let temp = Math.round(data.temperature) + '°C';
      let apparent_temp = Math.round(data.apparentTemperature) + '°C';
      let clouds = data.cloudCover*100 + '%';
      city = data.city+", "+data.country;
      let pop = data.precipProbability*100+'%';

      let path = this.getIcon(data.icon);
      // tried with fog as src too
      let icon = <img src={path} alt='weather' />

      weatherInfo = <div>
        {icon}
        <p>{temp} (Feels like {apparent_temp})</p>
        <p><b>Cloud Coverage:</b> {clouds}</p>
        <p><b>Chance of Rain:</b> {pop}</p>
      </div>;
    }

    return <div>
        <div className = 'topbarCity'>{city}</div>
        <div className = 'topbarWeather'>{weatherInfo}</div>
        <div className = 'topbarLogin'><AccountsUIWrapper/></div>
      </div>
  }

  render() {
    console.log(this.props.weatherEvents[0])
    // console.log(fog)
    let user = "";
    if (this.props.account.user) user = ' '+this.props.account.user.username;

    let t = null;
    let result;
    if (this.props.weather.data) t = this.props.weather.data.list[0].main.temp;

    let picture = "";
    if (user !== "") {
      let baseUrl = 'https://robohash.org/';
      picture = <img src={baseUrl + this.props.account.user._id} alt="Profile Icon" width="60" height="60"/>;
    }
    // warm
    if (t > 298.15)
      result = "topbar warm";
    // fair
    else if (t > 295.15 && t <= 298.15)
      result = "topbar fair";
    // cool
    else if (t <= 295.15)
      result = "topbar cold";
    else
      result = "topbar";

    let content = <div className = {result}>Hello{user}! {picture} {this.topbarInfo()}</div>
    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
    page: state.pages,
    preferences: state.preferences,
    weatherEvents: state.weatherMiddleware.weatherEvents,
    preferencesReady: state.preferences.preferencesReady,
    preferencesEvents: state.preferences.preferencesEvents,
    preferencesSubscriptionStopped: state.preferences.preferencesSubscriptionStopped,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {},
    dispatch
  );
};

// passes Meteor data reactively to component by wrapping it using withTracker()
// note we export TopbarContainer, however App component is still rendering the
// Topbar component—should this be changed?
const TopbarContainer = withAccount(Topbar);
// https://forums.meteor.com/t/react-context-withtracker-is-awesome/43811/18


export default connect(mapStateToProps, mapDispatchToProps)(TopbarContainer);
