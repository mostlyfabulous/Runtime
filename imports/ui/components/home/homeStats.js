import React from 'react';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { loadPastRunEvents } from '../../actions/index';

const runs = [];

class HomeStats extends React.Component {
    componentDidMount() {
        let date = new Date();
        this.props.loadPastRunEvents(date);
    }

    render() {
       console.log(this.props.runEvents)

       let runs = this.props.runEvents;
       let totalDist = runs.reduce(function (acc, run) {return acc + run.distance;}, 0)
        return (
            <div>
                <h1>Lifetime Statistics:</h1>
                Total Distance: {totalDist} km
                <br />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    runEvents: state.calendar.calendarEvents,
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        loadPastRunEvents
      },
      dispatch
    );
  };

export default connect (mapStateToProps, mapDispatchToProps)(HomeStats);