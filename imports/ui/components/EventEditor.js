import React, { Component } from 'react';
import { connect } from 'react-redux'
import { dragEvent, toggleEventEditor } from '../actions/index'
import {bindActionCreators} from 'redux';

export class EventEditor extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.editEventView.calendarEvent);
    const e = this.props.editEventView.calendarEvent;
    this.state = {
      title     : e.title,
      start     : e.start,
      end       : e.end,
      distance  : e.extendedProps.distance
      // duration  : e.extendedProps.duration
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    // const defaultValue = event.target[name];
    if (value)
      this.setState({
        [name]: value
      });
    // else{
    //   console.log("defaultValue");
    //   console.log(defaultValue);
    //   this.setState({
    //     [name]: defaultValue
    //   });}
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

  // componentWillReceiveProps(nextProps) {
  //   const {eventTitle, eventStart, eventEnd, eventExtendedProps} = this.props.editEventView.calendarEvent;
  //   this.state = {
  //     title     : eventTitle,
  //     start     : eventStart,
  //     end       : eventEnd,
  //     distance  : eventExtendedProps.distance
  //     // duration  : this.props.duration
  //   };
  // }
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
