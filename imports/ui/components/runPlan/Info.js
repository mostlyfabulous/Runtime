import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { config } from '../../../../config.js';
import { createUIWeatherEvents } from '../../../utils/createWeatherEvents.js'
import EventEditor from './EventEditor';
import { connect } from 'react-redux';
import { addWeatherData, addEvent, getNextRun, toggleEventEditor } from '../../actions/index'
import {bindActionCreators} from 'redux'
const axios = require('axios');
import NextRun from './NextRun';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const city_options = ['Calgary', 'Toronto', 'Vancouver'];
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const defaultOption = city_options[2];
let precip_url = ["https://weather.gc.ca/wxlink/wxlink.html?cityCode=ab-52&amp;lang=e",
  "https://weather.gc.ca/wxlink/wxlink.html?cityCode=on-143&amp;lang=e",
  "https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-74&amp;lang=e"]

let precip_url_selected = "https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-74&amp;lang=e";

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runData: {},
      weather: {},
      nextRun: {},
      city: '',
      precip_url_selected: precip_url[2]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleLoad();
  }
  handleLoad() {
    let weatherkey = config().openweatherapi
    let weather_url = 'https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,ca&appid=' + weatherkey;
    if (this.state.city !== ''){
      weather_url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + this.state.city + ',ca&appid=' + weatherkey;
    }
    axios.get(weather_url)
  .then(response => {
    this.props.addWeatherData(response);
    const {weather} = this.props;

  })
  .catch(error => {
    console.log(error);
  });
}


  handleChange(event) {
    this.setState({duration: event.target.duration});
  }

  handleSubmit() {
    event.preventDefault();
  }

  handleDropDown(e){
  this.setState({city: e.value});

  if (e.value === 'Calgary') {
    this.setState({
      precip_url_selected: precip_url[0]
    });
  } else if (e.value === 'Toronto') {
    this.setState({
      precip_url_selected: precip_url[1]
    });
  } else {
    this.setState({
      precip_url_selected: precip_url[2]
    });
  }
    this.handleLoad();
  }

  render() {
    let editor = undefined;
    let dropdownValue = defaultOption;
    if (this.props.editEventView.editorView) editor =<div key="1"><EventEditor/></div>;
    else editor = undefined;
    if (this.state.city) dropdownValue = this.state.city;
    
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
