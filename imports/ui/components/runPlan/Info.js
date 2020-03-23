import React, { Component } from 'react';
import EventEditor from './EventEditor';
import { connect } from 'react-redux';
import { addWeatherData, addEvent, getNextRun, toggleEventEditor } from '../../actions/index'
import {bindActionCreators} from 'redux'
import NextRun from './NextRun';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import 'react-dropdown/style.css';


class Info extends Component {

  render() {
    let editor = undefined;
    if (this.props.editEventView.editorView) editor =<div key="1"><EventEditor/></div>;
    else editor = undefined;
    
    return (
      <div>
        <NextRun/>
        <br/>
        <ReactCSSTransitionGroup
          transitionName="editor"
          transitionAppear={false}
          transitionAppearTimeout={500}
          transitionEnter={true}
          transitionEnterTimeout={500}
          transitionLeave={true}
          transitionLeaveTimeout={1300}>

          {editor}
        </ReactCSSTransitionGroup>
      </div>

    )
  }

  componentWillReceiveProps(nextProps) {
    this.props.getNextRun(nextProps.calendarEvents)
  }
}

const mapStateToProps = (state) => {
  return {  weather: state.weather,
            nextRun: state.nextRun,
            calendarEvents: state.calendar.calendarEvents,
            editEventView: state.editEventView
         };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addWeatherData, addEvent, getNextRun, toggleEventEditor
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
