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
// let precip_url = "https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-74&amp;lang=e";
let precip_url = ["https://weather.gc.ca/wxlink/wxlink.html?cityCode=ab-52&amp;lang=e",
  "https://weather.gc.ca/wxlink/wxlink.html?cityCode=on-143&amp;lang=e",
  "https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-74&amp;lang=e"]
// let precip_url = {};
// precip_url.Calgary = "https://weather.gc.ca/wxlink/wxlink.html?cityCode=ab-52&amp;lang=e";
// precip_url.Toronto = "https://weather.gc.ca/wxlink/wxlink.html?cityCode=on-143&amp;lang=e";
// precip_url.Vancouver = "https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-74&amp;lang=e";

let precip_url_selected = "https://weather.gc.ca/wxlink/wxlink.html?cityCode=bc-74&amp;lang=e";

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runData: {},
      weather: {},
      nextRun: {},
      current_temp: '',
      current_temp_min: '',
      current_temp_max: '',
      current_clouds: '',
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
    //precip_url_selected = precip_url.Vancouver;
    if (this.state.city !== ''){
      weather_url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + this.state.city + ',ca&appid=' + weatherkey;
      // let city = this.state.city;
      // precip_url_selected = precip_url.city;
      // console.log('handleLoad: ' + city);
      // console.log(precip_url.city)
    }

    // if (this.state.city === 'Calgary') {
    //   this.setState({
    //     precip_url_selected: precip_url[0]
    //   });
    // } else if (this.state.city === 'Toronto') {
    //   this.setState({
    //     precip_url_selected: precip_url[1]
    //   });
    // } else {
    //   this.setState({
    //     precip_url_selected: precip_url[2]
    //   });
    // }

    //console.log(precip_url)

    // let weather_url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + this.state.city + ',ca&appid=' + weatherkey;
    // axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Vancouver,ca&appid=' + weatherkey)
    axios.get(weather_url)
  .then(response => {
    this.props.addWeatherData(response);
    console.log(this.props.weather);
    const {weather} = this.props;
    this.setState({
            current_temp: Math.round(weather.data.list[0].main.temp-273.15) + '°C',
            current_temp_min: Math.round(weather.data.list[0].main.temp_min-273.15) + '°C',
            current_temp_max: Math.round(weather.data.list[0].main.temp_max-273.15) + '°C',
            current_clouds: weather.data.list[0].clouds.all + '%'
    })

     // this.props.addEvent(createUIWeatherEvents(weather.data.list));
     console.log('handleLoad: ' + weather_url)


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
    console.log('handleDropDown')
    console.log('handledropdown: ' + this.state.city)

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
  console.log(this.state.precip_url_selected);
    this.handleLoad();
  }

  render() {
    let editor = undefined;
    let dropdownValue = defaultOption;
    if (this.props.editEventView.editorView) editor =<div key="1"><EventEditor/></div>;
    else editor = undefined;
    if (this.state.city) dropdownValue = this.state.city;
    console.log("Render:" + this.state.precip_url_selected);
    return (
      <div>
        <Dropdown options={city_options} onChange={this.handleDropDown} value={dropdownValue} placeholder="Select an option" />
        <h2>3-Hour Forecast: {this.state.city}</h2>
        <p><b>Current Temp:</b> {this.state.current_temp}</p>
        <p><b>Min/Max Temp:</b> {this.state.current_temp_min}/{this.state.current_temp_max}</p>
        <p><b>Clouds:</b> {this.state.current_clouds} </p>
        <iframe title="Environment Canada Weather" width="287px" height="191px" src={this.state.precip_url_selected} allowtransparency="true" frameBorder="0"></iframe>
        <NextRun/>
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
    // console.log("change in prop—getting next run");
    // console.log(nextProps);
    this.props.getNextRun(nextProps.calendarEvents)
    // this.setState({runEditor: nextProps.editEventView.editorView})
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
