import React, { Component } from 'react';
import { connect } from 'react-redux'
import { dragEvent, toggleEventEditor } from '../../actions/index'
import {bindActionCreators} from 'redux';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export class EventEditor extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.editEventView.calendarEvent);
    const e = this.props.editEventView.calendarEvent;
    this.state = {
      title     : e.title,
      start     : e.start,
      end       : e.end,
      category  : e.extendedProps.category,
      distance  : e.extendedProps.distance,
      duration  : e.extendedProps.duration,
      owner     : e.extendedProps.owner,
      username  : e.extendedProps.username
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (value)
      this.setState({
        [name]: value
      });
  }

  handleChangeStart(date) {
    this.setState({
      start: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      end: date
    });
  }

  handleSubmit(jsEvent) {
    jsEvent.preventDefault();
    // 'event' var name is being reserved for being passed into the dragEvent action
    let eventDuration = "";
    if (this.state.end) {
      eventDuration = moment.duration(moment(this.state.end).diff(moment(this.state.start)));
    }
    let e = {
      event: {
        id        : this.props.editEventView.calendarEvent.id,
        title     : this.state.title,
        start     : this.state.start,
        end       : this.state.end,
        extendedProps: {
          category  : this.state.category,
          distance  : parseFloat(this.state.distance),
          duration  : eventDuration,
          owner     : this.state.owner,
          username  : this.state.username
        }
      }
    }
    this.props.dragEvent(e);
    this.props.toggleEventEditor(false, "");
    console.log("Submitted event:");
    console.log(e);

  }

  render() {
    const {title, start, end, extendedProps} = this.props.editEventView.calendarEvent;
    // if condition needed to prevent errors when transitioning out upon submit
    // transitioning out will remove props from being accessible and throw errors
    // when calling start.toString and accessing extendedProps.distance
    let endTime = "";
    if (end) endTime = end.toString()
    if (this.props.editEventView.editorView) {
      return (
        <div className="editor">
          <h2>Edit Run: {title}</h2>
          <form onSubmit={this.handleSubmit} ref='form'>
            <label htmlFor="title">Run Name</label>
            <input type="string" id="title" name="title"
              onChange={this.handleChange} placeholder="5km Run" />
            <br/>
            <label htmlFor="start_time">Start Time: {start.toString()}</label>
            <DatePicker
              selected={this.state.start}
              onChange={this.handleChangeStart}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Start time"
              />
            <br/>
            <label htmlFor="end_time">End Time: {endTime}</label>
            <DatePicker
              selected={this.state.end}
              onChange={this.handleChangeEnd}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="End time"
              />
            <br/>
            <label htmlFor="distance">Distance: {extendedProps.distance}</label>
            <input type="number" id="distance" name="distance"
              onChange={this.handleChange} step="0.01" placeholder="km/m" />
            <br/>
            <button type="submit">Update Run Information</button>
          </form>
        </div>
      );
    }
    return (
      <div className="editor">
        <h2>Edit Run: Saving...</h2>
      </div>
    )
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
