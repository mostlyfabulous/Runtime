import { combineReducers } from 'redux';

const weatherReducer = (weather, action) => {
  weather = weather || {};

	if (action.type === 'ADD_WEATHER_DATA') {
    let newState = action.content;
    weather = newState;
	}
	return weather
};
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
export default combineReducers({
	//user_input: userInputReducer,
  weather: weatherReducer,
  //runData: runDataReducer,
  pages: pagesReducer
});
