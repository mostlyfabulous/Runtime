import { Meteor } from 'meteor/meteor';
import React from 'react';
import { findIndexofEvent, filterOutEvent } from '../../utils/calendarUtils'
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

import {
  WEATHER_SUBSCRIPTION_READY,
  WEATHER_SUBSCRIPTION_CHANGED,
  WEATHER_SUB,
  RUNS_SUBSCRIPTION_READY,
  RUNS_SUBSCRIPTION_CHANGED,
  RUNS_SUB,
  ADD_EVENT, DELETE_EVENT, DRAG_EVENT, HIGHLIGHT_EVENT,
  ADD_GOOGLE_EVENT, CLEAR_GOOGLE_EVENTS
} from '../actions/index';
calendarRef = React.createRef()

const initialWeatherState = {
  weatherReady: false,
  weatherEvents: [],
  weatherSubscriptionStopped: false,
  weatherColorPrefs: {}
};

export function weatherReducerMiddleware(state = initialWeatherState, action) {
  switch (action.type) {
    case WEATHER_SUBSCRIPTION_READY:
      return {
        ...state,
        weatherReady: action.payload.ready,
        weatherColorPrefs: action.payload.data
      };
    case WEATHER_SUBSCRIPTION_CHANGED:
    if (state.weatherEvents) {
      let cool = 20;
      let warm = 24;
      if (state.weatherColorPrefs.userPreferences){
        cool = state.weatherColorPrefs.userPreferences.min_temp;
        warm = state.weatherColorPrefs.userPreferences.max_temp;
      }
      action.payload.map( (e) => {
        if (e.temperature > warm) {e.color = 'red';}
        else if (e.temperature > cool && e.temperature <= warm) {e.color = 'navajowhite'}
        else {e.color = '#1cdcbe'};
      });
      return {
        ...state,
        weatherEvents: action.payload,
      };
    }
      return {
        ...state,
        weatherEvents: action.payload,
      };
    case STOP_SUBSCRIPTION:
      return action.payload === WEATHER_SUB
        ? { ...state, weatherSubscriptionStopped: true }
        : state;
    default:
      return state;
  }
}

const initialCalendarState = {
  calendarReady: false,
  calendarEvents: [],
  googleEvents: [],
  calendarSubscriptionStopped: false,
  calendarHighlightedEvent: "",
};

export function calendarEventsReducer(state = initialCalendarState, action) {
  switch (action.type) {
    case RUNS_SUBSCRIPTION_READY:
      return {
        ...state,
        calendarReady: action.payload.ready,
      };
    case RUNS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        calendarEvents: action.payload,
      };
    case STOP_SUBSCRIPTION:
      return action.payload === RUNS_SUB
        ? { ...state, calendarSubscriptionStopped: true }
        : state;

	case ADD_EVENT:
    let newEvent = action.calendarEvent;
    Meteor.call('runs.addRun', newEvent, (error, result) => {
      if (error) {
        prompt("Could not add new event, please try again");
        return state;
      }
      return {
        ...state,
        calendarEvents: [...state.calendarEvents.concat(newEvent)] }
      });
    return state;

  case ADD_GOOGLE_EVENT:
    let googleEvent = action.calendarEvent;
    return {
      ...state,
      googleEvents: [...state.googleEvents.concat(googleEvent)] };

  case CLEAR_GOOGLE_EVENTS:
    return {
      ...state,
      googleEvents: [] };


  case DELETE_EVENT:
    Meteor.call('runs.deleteRun', action.calendarEventId, (error, result) => {
      const e = {id: action.calendarEventId};
      if (error) {
        prompt("Could not delete event, please try again");
        return state;
      }
      return {
        ...state,
        calendarEvents: filterOutEvent(state.calendarEvents, e),
        calendarHighlightedEvent: ""
      }
    });
    if (calendarHighlightedEvent.id === e.id) {
      return {
        ...state,
        calendarHighlightedEvent: ""
      }
    }
    return {
      ...state,
      calendarHighlightedEvent: ""
    }
    break;

  case HIGHLIGHT_EVENT:
    let highlightedEvent = {};
    if (action.event === "") return {...state,
      calendarHighlightedEvent: ""
    }
    if (action.event) {
      if (state.calendarHighlightedEvent && state.calendarHighlightedEvent.id === action.event.id) {
        return state;
      }
      let modifiedEvents = state.calendarEvents.map((event) => {
        if (event.id !== action.event.id) return event;
        highlightedEvent = {...event};
        let updatedEvent = {...event};
        updatedEvent.color = 'khaki';
        return updatedEvent;
      });
      if (state.calendarHighlightedEvent) {
          let previouslyHighlighted = {...state.calendarHighlightedEvent};
          modifiedEvents = filterOutEvent(modifiedEvents, previouslyHighlighted)
          modifiedEvents = modifiedEvents.concat(previouslyHighlighted);
      }
      return {...state,
        calendarEvents: modifiedEvents,
        calendarHighlightedEvent: highlightedEvent
      }

    } else {
      return state;
    }


  case DRAG_EVENT:
    let de = action.calendarEvent
    let modifiedEvent = {
      id     : de.event.id,
      _id    : de.event.id,
      title : de.event.title,
      start : de.event.start,
      end : de.event.end,
      allDay: de.allDay,
      distance: de.event.extendedProps.distance,
      duration: de.event.extendedProps.duration,
      durationActual  : de.event.extendedProps.durationActual,
      difficulty: de.event.extendedProps.difficulty,
      category: de.event.extendedProps.category,
      owner: de.event.extendedProps.owner,
      username: de.event.extendedProps.username,
    }

    const resUpdate = Meteor.call('runs.updateRun', modifiedEvent);
    return { ...state,
      calendarEvents: [...state.calendarEvents.filter( (event) => {
        return event.id !== (de.event.id)
      }), modifiedEvent]
    }

  default:
    return state;
  }
}
