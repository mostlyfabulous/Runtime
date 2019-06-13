import { combineReducers } from 'redux';

let initCal = [
    {id: '1', title: "Event Now", start: new Date() },
    {id: '2', title: "Event Now", start: new Date() }
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
/*user_id: action.runData.user_id,
calendar_id: action.runData.calendar_id,
calendar_date: action.runData.calendar_date,
calendar_start: action.runData.calendar_start,
calendar_end: action.runData.calendar_end,
calendar_title: action.runData.calendar_title,
expectedDuration: action.runData.expectedDuration,
actualDuration: 0,
distance: action.runData.distance};*/

const calendarEventsReducer = (calendarEvents, action) => {
  calendarEvents = calendarEvents || initCal;
	if (action.type === 'ADD_EVENT') {
    let newEvent = action.calendarEvent;
    return [...calendarEvents, newEvent
            ]
	}

	return calendarEvents
};

const pagesReducer = (currentPage = '', action) => {
	if (action.type === 'CHANGE_PAGE') {
    currentPage = action.pageName;
	}
	return currentPage
};
export default combineReducers({
	//user_input: userInputReducer,
  weather: weatherReducer,
  formData: formDataReducer,
  calendarEvents: calendarEventsReducer,
  pages: pagesReducer
});
