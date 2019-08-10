import React from 'react';
import { combineReducers } from 'redux';
import { weatherReducerMiddleware, calendarEventsReducer } from './calendarEventsReducer';
import { preferencesEventsReducer } from './preferencesEventsReducer';
import { barColors } from '../components/formatHelpers';

  const weatherReducer = (weather, action) => {
    weather = weather || {};
  	if (action.type === 'ADD_WEATHER_DATA') {
      let newState = action.content;
      weather = newState;
  	}
  	return weather
  };

  const formDataReducer = (currentResponses, action) => {
    currentResponses = currentResponses || [];
  	if (action.type === 'ADD_RESPONSE') {
      let newResponse = action.formData;
      return [...currentResponses, newResponse
              ]
  	}
    return currentResponses;
  };

const nextRunReducer = (nextRun, action) => {
  nextRun = nextRun || {};
  if (action.type === 'NEXT_RUN') {
    let now = moment();
    if (action.calendarEvents) {
      let events = action.calendarEvents.filter(calendarEvent => {
        return (calendarEvent.category === 'run') && (calendarEvent.start > now)
      })
    if (events.length > 0) {
        nextRun = events[0];
        for (let entry of events) {
          if (entry.start < action.mostRecent.start)
            nextRun = entry;
        }
      }
    }
  }
  return nextRun;
}

const pagesReducer = (currentPage = 'home', action) => {
	if (action.type === 'CHANGE_PAGE') {
    currentPage = action.pageName;
	}
	return currentPage
};

const eventEditorReducer = (editEventView, action) => {
  editEventView = editEventView || {editorView: false, calendarEvent: ""};
  if (action.type === 'TOGGLE_EDITOR') {
    const newState = {
      editorView: action.payload.toggle,
      calendarEvent: action.payload.calendarEvent
    }
    return newState;
  }
  return editEventView;
};

const currentDate = new Date();
const dateDayToWeekDay = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
let currentChartFormat = '';
let historyData = [];

const getHistoryInfoReducer = (info = [], action) => {
  if (action.type === 'HISTORY_INFO') {
    let runList = historyData;
    let newInfo = [];
    runList.forEach(function (list) {
      run = list[action.period]
      if (run !== null) {
        newInfo.push(run);
      }
    })
    return newInfo;
  } else if (action.type === 'GET_HISTORY')
    info = [];
  return info;
}

const getPreferencesReducer = (info = [], action) => {
  if (action.type === 'GET_HISTORY')
    info = [];
  return info;
}

const runHistoryDataReducer = (data = {}, action) => {
  if (action.type === 'GET_HISTORY') {
    currentChartFormat = action.format;

    let labels = [];
    let numDays;
    let i;
    if (action.format === 'WEEK') {
      numDays = 6

      let day = new Date();
      day.setDate(currentDate.getDate()-numDays);

      for (i = 0; i <= numDays; i++){
        labels[i] = dateDayToWeekDay[day.getDay()]+' '+(day.getMonth()+1)+'/'+day.getDate();
        day.setDate(day.getDate()+1);
      }
    }

    let datasets = [];
    historyData = action.data;
    let runList = historyData;

    for (i = 0; i < runList.length; i++){
      let distances = [];
      let list = runList[i]
      for (let j = 0; j < numDays+1; j++) {
        let run = list[j];
        if (!run) {
          distances[j] = 0
        } else
          distances[j] = run.distance;
      }
      let newSet = {
        label: 'Run #'+(i+1),
        backgroundColor: barColors[i%barColors.length],
        data: distances
      }
      datasets.splice(0,0,newSet);
    }

    data = {
      labels: labels,
      datasets: datasets
    }
  }
  return data;
}



export default combineReducers({
  weather: weatherReducer,
  weatherMiddleware: weatherReducerMiddleware,
  formData: formDataReducer,
  preferences: preferencesEventsReducer,
  calendar: calendarEventsReducer,
  nextRun: nextRunReducer,
  pages: pagesReducer,
  runHistory: runHistoryDataReducer,
  historyInfo: getHistoryInfoReducer,
  editEventView: eventEditorReducer
});
