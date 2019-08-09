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
    console.log(action.payload.data);
      return {
        ...state,
        weatherReady: action.payload.ready,
        weatherColorPrefs: action.payload.data
      };
    case WEATHER_SUBSCRIPTION_CHANGED:
    if (state.weatherEvents) {
      console.log("coloring weather events");
      let cool = 20;
      let warm = 24;
      if (state.weatherColorPrefs.userPreferences){
        cool = state.weatherColorPrefs.userPreferences.min_temp;
        warm = state.weatherColorPrefs.userPreferences.max_temp;
      }
      action.payload.map( (e) => {
        if (e.temperature > warm) {e.color = 'red';}
        else if (e.temperature > cool && e.temperature <= warm) {e.color = 'green'}
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
    case STOP_SUBSCRIPTION: // currently don't need to stop a sub
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
        // concat allows an array of events to be added vs [...events, event(s)]
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
  console.log("deleting");
    Meteor.call('runs.deleteRun', action.calendarEventId, (error, result) => {
      const e = {id: action.calendarEventId};
      if (error) {
        prompt("Could not delete event, please try again");
        return state;
      }
      return {
        ...state, // on successful database delete, update state finally
        calendarEvents: filterOutEvent(state.calendarEvents, e),
        calendarHighlightedEvent: ""
      }
    });
    if (calendarHighlightedEvent.id === e.id) {
      console.log("Clearing highlightedEvent based on id");
      // clear highlightedEvent from Store as well
      return {
        ...state, // on successful database delete, update state finally
        calendarHighlightedEvent: ""
      }
    }
    // delete event does not wait on callback, returns original state first
    return {
      ...state,
      calendarHighlightedEvent: ""
    }
    break;

  case HIGHLIGHT_EVENT:
    console.log("highlightClickedEvent fire");
    let highlightedEvent = {};
    // if action.event is "" then clear the highlightedEvent (Event deleted or editing canceled)
    if (action.event === "") return {...state,
      calendarHighlightedEvent: ""
    }
    if (action.event) { // should recieve an event
      // if user clicks on the same event, do nothing
      if (state.calendarHighlightedEvent && state.calendarHighlightedEvent.id === action.event.id) {
        return state;
      }
      let modifiedEvents = state.calendarEvents.map((event) => {
        if (event.id !== action.event.id) return event;
        // when event is found
        highlightedEvent = {...event};
        console.log(highlightedEvent);
        let updatedEvent = {...event};
        updatedEvent.color = 'khaki';
        return updatedEvent;
      });
      // restore previously highlighted event color and update highlightedEvent
      if (state.calendarHighlightedEvent) {
        console.log(state.calendarHighlightedEvent);
        console.log("Prev event highlighted:");
          let previouslyHighlighted = {...state.calendarHighlightedEvent};
          console.log(previouslyHighlighted);
          // remove highlightedEvent with khaki color
          modifiedEvents = filterOutEvent(modifiedEvents, previouslyHighlighted)
          modifiedEvents = modifiedEvents.concat(previouslyHighlighted);
      }
      return {...state,
        calendarEvents: modifiedEvents,
        calendarHighlightedEvent: highlightedEvent
      }

    } else {
      console.log("Could not get event ID");
      return state;
    }


  case DRAG_EVENT:
    console.log("event drag fire");
    let de = action.calendarEvent
    // console.log(de);
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
    // console.log(modifiedEvent);
    return { ...state,
      calendarEvents: [...state.calendarEvents.filter( (event) => {
        return event.id !== (de.event.id)
      }), modifiedEvent]
    }

  default:
    return state;
  }
}
