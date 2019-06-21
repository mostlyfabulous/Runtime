import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
// import {  } from './actions/index'

export class EventEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title     : this.props.title,
      start     : this.props.start,
      end       : this.props.end,
      distance  : this.props.distance
      // duration  : this.props.duration
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      title     : event.target.title,
      start     : event.target.start,
      end       : event.target.end,
      distance  : event.target.distance
    });
  }

  handleSubmit() {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Edit Run:</h2>
        <form onSubmit={this.handleSubmit} ref='form'>
          <label htmlFor="title">Run Name</label>
          <input type="string" id="title" placeholder="5km Run" />
          <br/>
          <label htmlFor="start_time">Start Time</label>
          <input type="time" id="start_time" step="60" placeholder="Hours: Minutes" />
          <br/>
          <label htmlFor="end_time">End Time</label>
          <input type="time" id="end_time" step="60" placeholder="Hours: Minutes" />
          <br/>
          <label htmlFor="distance">Distance</label>
          <input type="number" id="distance" step="0.01" placeholder="km/m" />
          <br/>
          <button type="submit">Find a Run!</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // toggleEventEditor
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EventEditor);
