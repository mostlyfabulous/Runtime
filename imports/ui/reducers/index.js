import React from 'react';
import { combineReducers } from 'redux';
calendarRef = React.createRef()

let initCal = [
    {id: '1', title: "Event Now 1", start: new Date()},
    {id: '2', title: "Event Now 2", start: new Date()}
  ];

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

  const calendarEventsReducer = (calendarEvents, action) => {
  calendarEvents = calendarEvents || initCal;
	if (action.type === 'ADD_EVENT') {
    let newEvent = action.calendarEvent;
    // concat allows an array of events to be added vs [...events, event(s)]
    return [...calendarEvents.concat(newEvent)]
	}
  if (action.type === 'RENAME_EVENT') {
    console.log("rename event fire");
    let e = action.id
    if (action.newName) {
      let targetID = calendarEvents.findIndex(function (event) {
        return e.id === event.id;
      });
      return calendarEvents.map((event, index) => {
        if (index !== targetID) {
          return event
        }
        let updatedEvent = {...event};
        console.log(updatedEvent);
        updatedEvent.title = action.newName;
        return updatedEvent;
      });
      } else {
        console.log("Invalid name passed was:" + action.newName);
        return calendarEvents;
      }
    }
  if (action.type === 'DRAG_EVENT') {
    console.log("revent drag fire");
    let e = action.calendarEvent
    console.log(targetID);
    let modifiedEvent = {
      id    : e.event.id,
      title : e.event.title,
      start : e.event.start,
      end : e.event.end
    }
    return [...calendarEvents.filter( (event) => {
      return event.id !== (e.event.id)
    }), modifiedEvent]
  }
  return calendarEvents;
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

const pagesReducer = (currentPage = '', action) => {
	if (action.type === 'CHANGE_PAGE') {
    currentPage = action.pageName;
	}
	return currentPage
};

let exampleRuns = [
  [
    // first run each day
    {
      day: 0,
      distance: 3,
      duration: 40
    },
    {
      day: 2,
      distance: 1,
      duration: 10
    },
    {
      day: 6,
      distance: 4,
      duration: 40
    }
  ],
  [
    // second run each day
    {
      day: 0,
      distance: 1,
      duration: 10
    },
    {
      day: 1,
      distance: 10,
      duration: 120
    },
    {
      day: 4,
      distance: 1,
      duration: 10
    }
  ],
  [
    {
      day: 0,
      distance: 2,
      duration: 20
    },
    {
      day: 5,
      distance: 5,
      duration: 65
    },
    {
      day: 6,
      distance: 3,
      duration: 36
    }
  ]
]

const getHistoryInfoReducer = (info = [], action) => {
  if (action.type === 'HISTORY_INFO') {
    let runList = exampleRuns;
    let newInfo = [];
    runList.forEach(function (list) {
      list.forEach(function (run) {
        if (run.day === action.period){
          newInfo.push(run);
        }
      })
    })
    return newInfo;
  }
  return info;
}

const runHistoryDataReducer = (data = {}, action) => {
  if (action.type === 'GET_HISTORY') {
    let barColors = ['blue', 'green', 'red', 'yellow', 'purple', 'orange', 'indigo']
    let labels
    if (action.format === 'WEEK') {

      labels = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    }
    // else if (action.format === 'DAY'){
    //   something
    // } else if (action.format === 'MONTH') {
    //   something
    // }

    let datasets = [];
    let i;
    let runList = exampleRuns

    for (i = 0; i < runList.length; i++){
      let distances = [];
      runList[i].forEach(function (run) {
        distances[run.day] = run.distance;
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
  formData: formDataReducer,
  calendarEvents: calendarEventsReducer,
  pages: pagesReducer,
  runHistory: runHistoryDataReducer,
  historyInfo: getHistoryInfoReducer,
});
/*if (action.type === 'RENAME_EVENT') {
  if (action.payload.name) {
    // set up to prepare for event modification
    let e = action.payload.calendarEvent
    let currentEvents = [...calendarEvents];
    let renameIndex = calendarEvents.findIndex(function (event) {
      // console.log(e);
      return e.id === event.id;
    });
    let eventToRename = {...currentEvents[renameIndex]};
    eventToRename.title = action.payload.name;
    currentEvents[renameIndex] = eventToRename;
    return currentEvents;
    }
  else {
    console.log("Name passed was:" + action.payload.name);
    return calendarEvents;
  }
} */
