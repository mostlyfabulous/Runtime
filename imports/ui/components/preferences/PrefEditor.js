import React, { Component } from 'react';
import { connect } from 'react-redux'
import { dragEvent, toggleEventEditor } from '../../actions/index'
import {bindActionCreators} from 'redux';

export class PrefEditor extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.editEventView.calendarEvent);
    const e = this.props.editEventView.calendarEvent;
    this.state = {

      // title     : e.title,
      // start     : e.start,
      // end       : e.end,
      // distance  : e.extendedProps.distance,
      // duration  : e.extendedProps.duration,
      // owner     : e.extendedProps.owner,
      // username  : e.extendedProps.username
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    let currentUser = Meteor.user()._id;
    // const defaultValue = event.target[name];
    // console.log('edit user pref')
    // console.log(this.props.userPref.currentUser)
    // if (value)
    //   this.setState({
    //     userPref.currentUser.[name]: value
    //   });
    // else{
    //   console.log("defaultValue");
    //   console.log(defaultValue);
    //   this.setState({
    //     [name]: defaultValue
    //   });}
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
          distance  : this.state.distance,
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
    // console.log(start);
    let currentUser = Meteor.user()._id;
    // const defaultValue = event.target[name];
    // console.log('edit user pref')
    // console.log(userPref.currentUser)
    return (
      <div>
        <h2>Edit Preferences: {title}</h2>
        <form onSubmit={this.handleSubmit} ref='form'>
          <label htmlFor="clouds">Clouds</label>
          <input type="number" id="clouds" name="clouds" defaultValue={1||extendedProps.clouds}
            onChange={this.handleChange} step="1" placeholder="°C" />
          <br/>
          <label htmlFor="minTemp">Min Temp</label>
          <input type="number" id="minTemp" name="minTemp" defaultValue={1||extendedProps.minTemp}
            onChange={this.handleChange}  step="1" placeholder="°C"/>
          <br/>
          <label htmlFor="maxTemp">End Time</label>
          <input type="number" id="maxTemp" name="maxTemp" defaultValue={1||extendedProps.maxTemp}
            onChange={this.handleChange}  step="1" placeholder="°C" />
          <br/>
          <label htmlFor="precipitation">Precipitation (POP)</label>
          <input type="number" id="precipitation" name="precipitation" defaultValue={1||extendedProps.precipitation}
            onChange={this.handleChange} step="1" placeholder="%" />
          <br/>
          <button type="submit">Update User Preferences</button>
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
    userPref: state.userPref
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

export default connect(mapStateToProps, mapDispatchToProps)(PrefEditor);
