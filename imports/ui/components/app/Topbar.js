import React from 'react';
import { connect } from 'react-redux';
import { withAccount } from '../accounts/connector.js'
import AccountsUIWrapper from '../accounts/AccountsUIWrapper.js';

class Topbar extends React.Component {
  topbarInfo() {
    let weatherInfo = ""
    let city = "";
    if (this.props.weather.data){
      let data = this.props.weather.data;
      console.log(data)

      let temp = Math.round(data.list[0].main.temp-273.15) + '°C';
      let temp_min = Math.round(data.list[0].main.temp_min-273.15) + '°C';
      let temp_max = Math.round(data.list[0].main.temp_max-273.15) + '°C';
      let clouds = data.list[0].clouds.all + '%';
      city = data.city.name+", "+data.city.country;

      weatherInfo = <div>
        <p><b>Currently</b> {temp}</p>
        <p><b>Low </b> {temp_min}, <b>High </b>{temp_max}</p>
        <p><b>Cloud Coverage:</b> {clouds}</p>
      </div>;
    }
    return <div>
        <div className = 'topbarCity'>{city}</div>
        <div className = 'topbarWeather'>{weatherInfo}</div>
        <div className = 'topbarLogin'><AccountsUIWrapper/></div>
      </div> 
  }

  render() {
    // console.log(this.props);
    let user = "...logging in...";
    let baseUrl = 'https://robohash.org/';
    if (this.props.account.user) user = this.props.account.user.username;

    let t = null;
    let result;
    if (this.props.weather.data) t = this.props.weather.data.list[0].main.temp;

    if (user !== "...logging in...") {
      let picture = baseUrl + this.props.account.user._id;
      // warm
      if (t > 298.15) 
        result = <div className="topbar warm">Hello {user}! <img src={picture} alt="Profile Icon" width="60" height="60"/> {this.topbarInfo()} </div>
      
      // fair
      else if (t > 295.15 && t <= 298.15)
          result = <div className="topbar fair">Hello {user}! <img src={picture} alt="Profile Icon" width="60" height="60"/>{this.topbarInfo()} </div>
      // cool
      else if (t <= 295.15) 
          result = <div className="topbar cold">Hello {user}! <img src={picture} alt="Profile Icon" width="60" height="60"/>{this.topbarInfo()} </div>
      else 
          result = <div className="topbar">Hello {user}! <img src={picture} alt="Profile Icon" width="60" height="60"/>{this.topbarInfo()} </div>
    } else {
      // warm
      if (t > 298.15) 
          result = <div className="topbar warm">Hello {user}!{this.topbarInfo()} </div>
      // fair
      else if (t > 295.15 && t <= 298.15) 
          result = <div className="topbar fair">Hello {user}!{this.topbarInfo()} </div>
      // cool
      else if (t <= 295.15) 
          result = <div className="topbar cold">Hello {user}!{this.topbarInfo()} </div>
      else
          result = <div className="topbar">Hello {user}!{this.topbarInfo()} </div>
    }
    return result;
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
  }
}

// passes Meteor data reactively to component by wrapping it using withTracker()
// note we export TopbarContainer, however App component is still rendering the
// Topbar component—should this be changed?
const TopbarContainer = withAccount(Topbar);
// https://forums.meteor.com/t/react-context-withtracker-is-awesome/43811/18


export default connect(mapStateToProps)(TopbarContainer);
