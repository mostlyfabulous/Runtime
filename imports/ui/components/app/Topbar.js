import React from 'react';
import { connect } from 'react-redux';
import { withAccount } from '../accounts/connector.js'

class Topbar extends React.Component {

  render() {
    // console.log(this.props);
    let user = "...logging in...";
    let baseUrl = 'https://robohash.org/';
    if (this.props.account.user) user = this.props.account.user.username

    let t = null;
    if (this.props.weather.data) t = this.props.weather.data.list[0].main.temp;

    if (user !== "...logging in...") {
      let picture = baseUrl + this.props.account.user._id;
      // warm
      if (t > 298.15) return (
          <div className="topbar warm">Hello {user}! <img src={picture} alt="Profile Icon" width="60" height="60"/> </div>
      )
      // fair
      else if (t > 295.15 && t <= 298.15) return (
          <div className="topbar fair">Hello {user}! <img src={picture} alt="Profile Icon" width="60" height="60"/></div>
      )
      // cool
      else if (t <= 295.15) return (
          <div className="topbar cold">Hello {user}! <img src={picture} alt="Profile Icon" width="60" height="60"/></div>
      )
      return (
          <div className="topbar">Hello {user}! <img src={picture} alt="Profile Icon" width="60" height="60"/></div>
      )
    } else {
      // warm
      if (t > 298.15) return (
          <div className="topbar warm">Hello {user}!</div>
      )
      // fair
      else if (t > 295.15 && t <= 298.15) return (
          <div className="topbar fair">Hello {user}!</div>
      )
      // cool
      else if (t <= 295.15) return (
          <div className="topbar cold">Hello {user}!</div>
      )
      return (
          <div className="topbar">Hello {user}!</div>
      )
    }

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
