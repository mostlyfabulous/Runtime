import React from 'react';
import { combineReducers } from 'redux';
import { weatherReducerMiddleware, calendarEventsReducer } from './calendarEventsReducer';

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
      console.log('cur responses')
      console.log(currentResponses);
      return [...currentResponses, newResponse
              ]
  	}
    return currentResponses;
  };

const nextRunReducer = (nextRun, action) => {
  nextRun = nextRun || {};
  if (action.type === 'NEXT_RUN') {
    // console.log("get next run");
    let now = new Date();
    //console.log(action.calendarEvents);
    if (action.calendarEvents.category) {
      let events = action.calendarEvents.filter(calendarEvent => {
        // console.log(calendarEvent);
        return (calendarEvent.category === 'run') && (calendarEvent.start > now)
      })
    // action.mostRecent = {};
    if (events.length > 0) {
        nextRun = events[0];
        // console.log(events);
        for (let entry of events) {
          if (entry.start < action.mostRecent.start)
            nextRun = entry;
        }
      }
    }
  }
  // console.log(nextRun);
  return nextRun;
}
/*
const runDataReducer = (currentRuns, action) => {
  currentRuns = currentRuns || {};
	if (action.type === 'ADD_RUN') {
    let newRun = {
      user_id: action.runData.user_id,
      calendar_id: action.runData.calendar_id,
      calendar_date: action.runData.calendar_date,
      calendar_start: action.runData.calendar_start,
      calendar_end: action.runData.calendar_end,
      calendar_title: action.runData.calendar_title,
      expectedDuration: action.runData.expectedDuration,
      actualDuration: 0,
      distance: action.runData.distance};
	}
  return [...currentRuns, newRun
          ]
};
*/

const pagesReducer = (currentPage = 'plan', action) => {
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
    console.log(newState);
    return newState;
  }
  console.log(editEventView);
  return editEventView;
};

// for dummy history data
const currentDate = new Date();

const date1 = new Date();
const date2 = new Date();
const date3 = new Date();
const date4 = new Date();
const date5 = new Date();
const date6 = new Date();
const date7 = new Date();
const date8 = new Date();
const date9 = new Date();

date1.setDate(currentDate.getDate()-6);
date2.setDate(currentDate.getDate()-4);
date3.setDate(currentDate.getDate());
date4.setDate(currentDate.getDate()-6);
date5.setDate(currentDate.getDate()-5);
date6.setDate(currentDate.getDate()-2);
date7.setDate(currentDate.getDate()-6);
date8.setDate(currentDate.getDate()-1);
date9.setDate(currentDate.getDate());

let exampleRuns = [
  [
    // first run each day
    {
      day: date1,
      distance: 3,
      duration: 40
    },
    {
      day: date2,
      distance: 1,
      duration: 10
    },
    {
      day: date3,
      distance: 4,
      duration: 40
    }
  ],
  [
    // second run each day
    {
      day: date4,
      distance: 1,
      duration: 10
    },
    {
      day: date5,
      distance: 10,
      duration: 120
    },
    {
      day: date6,
      distance: 1,
      duration: 10
    }
  ],
  [
    {
      day: date7,
      distance: 2,
      duration: 20
    },
    {
      day: date8,
      distance: 5,
      duration: 65
    },
    {
      day: date9,
      distance: 3,
      duration: 36
    }
  ]
]

const dateDayToWeekDay = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
let currentChartFormat = '';

const getHistoryInfoReducer = (info = [], action) => {
  if (action.type === 'HISTORY_INFO') {
    let runList = exampleRuns;
    let newInfo = [];

    let period = new Date();
    if (currentChartFormat === 'WEEK') {
      period.setDate(period.getDate()-6+action.period)
    }

    runList.forEach(function (list) {
      list.forEach(function (run) {
        if (run.day.getDate() === period.getDate() && run.day.getMonth() === period.getMonth()){
          newInfo.push(run);
        }
      })
    })
    return newInfo;
  } else if (action.type === 'GET_HISTORY')
    info = [];
  return info;
}

const runHistoryDataReducer = (data = {}, action) => {
  if (action.type === 'GET_HISTORY') {
    let barColors = ['blue', 'green', 'red', 'yellow', 'purple', 'orange', 'indigo']
    currentChartFormat = action.format;

    let labels = [];
    let numDays;
    let i;
    if (action.format === 'WEEK') {
      numDays = 6

      let startDay = new Date();
      startDay.setDate(currentDate.getDate()-numDays);

      for (i = 0; i <= numDays; i++){
        let day = new Date();
        day.setDate(startDay.getDate()+i)
        labels[i] = dateDayToWeekDay[day.getDay()]+' '+(day.getMonth()+1)+'/'+day.getDate();
      }
    }
    // else if (action.format === 'DAY'){
    //   something
    // } else if (action.format === 'MONTH') {
    //   something
    // }

    let datasets = [];
    let runList = exampleRuns

    for (i = 0; i < runList.length; i++){
      let distances = [];
      runList[i].forEach(function (run) {
        distances[(run.day-currentDate)/((3600000*24))+numDays] = run.distance;
      })
      datasets[i] = {
        label: 'Run #'+(i+1),
        backgroundColor: barColors[i],
        data: distances
      }
    }

    data = {
      labels: labels,
      datasets: datasets
      // datasets: [
      //   {
      //     label: 'Run #1',
      //     backgroundColor:'blue',
      //     data: [3,1,4,0,6,2,3]
      //   },
      //   {
      //     label: 'Run #2',
      //     backgroundColor:'green',
      //     data: [3,10,1,null,null,1,2]
      //   }
      // ]
    }
  }
  return data;
}


export default combineReducers({
	//user_input: userInputReducer,
  weather: weatherReducer,
  weatherMiddleware: weatherReducerMiddleware,
  formData: formDataReducer,
  calendarEvents: calendarEventsReducer,
  nextRun: nextRunReducer,
  pages: pagesReducer,
  runHistory: runHistoryDataReducer,
  historyInfo: getHistoryInfoReducer,
  editEventView: eventEditorReducer
});
