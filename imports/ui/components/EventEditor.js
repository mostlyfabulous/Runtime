import React, { Component } from 'react';
import { connect } from 'react-redux'
import { dragEvent, toggleEventEditor } from '../actions/index'
import {bindActionCreators} from 'redux';

import { Button } from 'reactstrap';

export class EventEditor extends Component {
  constructor(props) {
    super(props);
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

  handleSubmit(jsEvent) {
    jsEvent.preventDefault();
    // event is being reserved for being passed into the dragEvent action
    let e = {
      event: {
        id        : this.props.editEventView.calendarEvent.id,
        title     : this.state.title,
        start     : this.state.start,
        end       : this.state.end,
        extendedProps: {
          category  : this.state.category,
          distance  : parseFloat(this.state.distance),
          owner     : this.state.owner,
          username  : this.state.username
        }
      }
    }
    this.props.dragEvent(e);
    this.props.toggleEventEditor(false, "");

  }

  render() {
    const {title, start, end, extendedProps} = this.props.editEventView.calendarEvent;
    if (this.props.editEventView.editorView) {
      return (
        <div className="editor">
          <h2>Edit Run: {title}</h2>
          <form onSubmit={this.handleSubmit} ref='form'>
            <label htmlFor="title">Run Name</label>
            <input type="string" id="title" name="title" defaultValue={title}
              onChange={this.handleChange} placeholder="5km Run" />
            <br/>
            <label htmlFor="start_time">Start Time: {start.toString()}</label>
            <input type="datetime-local" id="start_time" name="start"
              onChange={this.handleChange}  />
            <br/>
            <label htmlFor="end_time">End Time</label>
            <input type="datetime-local" id="end_time" name="end"
              onChange={this.handleChange}  />
            <br/>
            <label htmlFor="distance">Distance: {extendedProps.distance}</label>
            <input type="number" id="distance" name="distance" defaultValue={extendedProps.distance}
              onChange={this.handleChange} step="0.01" placeholder="km/m" />
            <br/>
            <Button color="primary" type="submit">Update Run Information</Button>
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
