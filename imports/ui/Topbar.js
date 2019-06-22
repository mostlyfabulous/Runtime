import React from 'react';
import { connect } from 'react-redux';

class Topbar extends React.Component {

  render() {
    let t = null;
    if (this.props.weather.data) t = this.props.weather.data.list[0].main.temp;
    // warm
    if (t > 298.15) return (
        <div className="topbar warm">Hello user{/* this.props.username */}!</div>
    )
    // fair
    else if (t > 295.15 && t <= 298.15) return (
        <div className="topbar fair">Hello user{/* this.props.username */}!</div>
    )
    // cool
    else if (t <= 295.15) return (
        <div className="topbar cold">Hello user{/* this.props.username */}!</div>
    )
    return (
        <div className="topbar">Hello user{/* this.props.username */}!</div>
    )
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log(nextProps);
  //   if (nextProps.weather.data.list[0].main.temp)
  //     t = nextProps.weather.data.list[0].main.temp
  //   }
}

const mapStateToProps = (state) => {
  return {  weather: state.weather,

         };
}

export default connect(mapStateToProps)(Topbar);
