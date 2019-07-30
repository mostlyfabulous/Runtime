import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { deleteEvent, dragEvent, toggleEventEditor } from '../../actions/index'
import { Slider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {difficultyMarks, valuetext} from '../../../utils/slider.js'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export class EventEditor extends Component {
  constructor(props) {
    super(props);

    const e = this.props.editEventView.calendarEvent;
    this.state = {
      id        : e.id,
      title     : e.title,
      start     : e.start,
      end       : e.end,
      category  : e.extendedProps.category,
      distance  : e.extendedProps.distance,
      duration  : e.extendedProps.duration,
      durationActual  : e.extendedProps.durationActual,
      difficulty: e.extendedProps.difficulty,
      owner     : e.extendedProps.owner,
      username  : e.extendedProps.username,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this);
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

  handleChangeDifficulty(event, value) {
    this.setState({
      difficulty: value
    });
  }

  handleSubmit(jsEvent) {
    jsEvent.preventDefault();
    // 'event' var name is being reserved for being passed into the dragEvent action
    let eventDuration = "";
    if (this.state.end) {
      eventDuration = moment.duration(moment(this.state.end).diff(moment(this.state.start)));
    }
    console.log(this.state);
    let durationAdjuster = moment().set({'hour': 0, 'seconds': 0, 'ms': 0});
    let parsedDuration = moment(this.state.durationActual).diff(durationAdjuster);
    console.log("ms:" +parsedDuration);
    parsedDuration = moment.duration(parsedDuration);
    console.log(parsedDuration);
    let e = {
      event: {
        id        : this.state.id,
        title     : this.state.title,
        start     : this.state.start,
        end       : this.state.end,
        extendedProps: {
          category  : this.state.category,
          distance  : parseFloat(this.state.distance),
          duration  : eventDuration,
          durationActual  : parsedDuration,
          difficulty: this.state.difficulty,
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
    let {title, start, end, extendedProps} = this.props.editEventView.calendarEvent;
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
              onChange={this.handleChange} placeholder={title} />
            <br/>
            <label htmlFor="distance">Distance (km)</label>
            <input type="number" id="distance" name="distance"
              onChange={this.handleChange} step="0.01"
              placeholder={extendedProps.distance + "km"} />
            <br/>
            <label htmlFor="start_time">Start Time</label>
            <DatePicker
              selected={this.state.start}
              onChange={this.handleChangeStart}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Start time"
            />
            <br/>
            <label htmlFor="end_time">End Time</label>
            <DatePicker
              selected={this.state.end}
              onChange={this.handleChangeEnd}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="End time"
            />
            <br/>
            <label htmlFor="durationActual">Actual Duration</label>
              <input type="number" id="durationActualH" name="durationActualH"
                min="0" max="24" step="1"
                placeholder={extendedProps.actualDuration}/>
            <br/>
            <label htmlFor="difficulty">Difficulty:</label>
            <Slider
              min={0} max={10} step={1}
              defaultValue={5}
              aria-label='Difficulty'
              aria-labelledby="difficulty"
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              value={this.state.difficulty}
              marks={difficultyMarks}
              onChange={this.handleChangeDifficulty}
              />
            <br/>
            <button type="submit">Update Run Information</button>
            <button
              type="submit"
              className="delete"
              onClick={ (e) => {
                this.props.deleteEvent(this.state.id);
                this.props.toggleEventEditor(false, "");
                }
              }>Delete Run</button>
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

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.editEventView.calendarEvent.id !== this.props.editEventView.calendarEvent.id
      && this.props.editEventView.calendarEvent !== "") {
      const {id, title, start, end, extendedProps} = this.props.editEventView.calendarEvent;
      console.log(this.props.editEventView.calendarEvent);
      this.setState({
        id        : id,
        title     : title,
        start     : start,
        end       : end,
        category  : extendedProps.category,
        distance  : extendedProps.distance,
        duration  : extendedProps.duration,
        durationActual  : extendedProps.durationActual,
        difficulty: extendedProps.difficulty,
        owner     : extendedProps.owner,
        username  : extendedProps.username
      });
    }
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
      deleteEvent, dragEvent, toggleEventEditor
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EventEditor);
