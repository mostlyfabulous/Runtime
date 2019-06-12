import { combineReducers } from 'redux';

const weatherReducer = (weather, action) => {
  weather = weather || {};

	if (action.type === 'ADD_WEATHER_DATA') {
    let newState = action.content;
    weather = newState;
    //console.log('cur_state1:' + JSON.stringify(weather));
    return weather;
	}
	return weather
};

const displayMessageReducer = (old='', action) => {
	if (action.type === 'DISPLAY_MESSAGE') {
    old = action;
	}
	return old;
};

const weatherReducer = (response, action) => {
  weather = weather || {};

	if (action.type === 'ADD_WEATHER_DATA') {
    let newState = action.content;
    weather = newState;
    //console.log('cur_state1:' + JSON.stringify(weather));
    return weather;
	}
	return weather
};

const displayMessageReducer = (old='', action) => {
	if (action.type === 'DISPLAY_MESSAGE') {
    old = action;
	}
	return old;
};

export default combineReducers({
	//user_input: userInputReducer,
  weather: weatherReducer
});
