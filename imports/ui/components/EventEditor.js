import React, { Component } from 'react';
import { connect } from 'react-redux'
import { dragEvent, toggleEventEditor } from '../actions/index'
import {bindActionCreators} from 'redux';

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
    const defaultValue = event.target.defaultValue;
    const value = event.target.value;
    const name = event.target.name;
    if (value)
      this.setState({
        [name]: value
      });
    else{
      console.log("defaultValue");
      console.log(defaultValue);
      this.setState({
        [name]: defaultValue
      });}
  }

  handleSubmit(jsEvent) {
    // event is being reserved for being passed into the dragEvent action
    let e = {
      event: {
        id        : this.props.editEventView.calendarEvent.id,
        title     : this.state.title,
        start     : this.state.start,
        end       : this.state.end,
        distance  : this.state.distance
      }
    }
    this.props.dragEvent(e);
    this.props.toggleEventEditor(false, "");
    console.log("Submitted event:");
    console.log(e);
    jsEvent.preventDefault();
  }

  render() {
    const {title, start, end, extendedProps} = this.props.editEventView.calendarEvent;
    // console.log(start);
    return (
      <div>
        <h2>Edit Run:</h2>
        <form onSubmit={this.handleSubmit} ref='form'>
          <label htmlFor="title">Run Name</label>
          <input type="string" id="title" name="title" defaultValue={title}
            onChange={this.handleChange} placeholder="5km Run" />
          <br/>
          <label htmlFor="start_time">Start Time</label>
          <input type="datetime-local" id="start_time" name="start"
            onChange={this.handleChange}  />
          <br/>
          <label htmlFor="end_time">End Time</label>
          <input type="datetime-local" id="end_time" name="end"
            onChange={this.handleChange}  />
          <br/>
          <label htmlFor="distance">Distance</label>
          <input type="number" id="distance" name="distance" defaultValue={extendedProps.distance}
            onChange={this.handleChange} step="0.01" placeholder="km/m" />
          <br/>
          <button type="submit">Update Run Information</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editEventView: state.editEventView,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      dragEvent, toggleEventEditor
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EventEditor);
