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
  ADD_EVENT, RENAME_EVENT, DRAG_EVENT, HIGHLIGHT_EVENT
} from '../actions/index';
calendarRef = React.createRef()

const initialWeatherState = {
  weatherReady: false,
  weatherEvents: [],
  weatherSubscriptionStopped: false,
};

export function weatherReducerMiddleware(state = initialWeatherState, action) {
  switch (action.type) {
    case WEATHER_SUBSCRIPTION_READY:
      return {
        ...state,
        weatherReady: action.payload.ready,
      };
    case WEATHER_SUBSCRIPTION_CHANGED:
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
    case STOP_SUBSCRIPTION: // TODO: stop a sub when a user logs out or exits
      return action.payload === RUNS_SUB
        ? { ...state, calendarSubscriptionStopped: true }
        : state;

	case ADD_EVENT:
    let newEvent = action.calendarEvent;
    const res = Meteor.call('runs.addRun', newEvent);
    // console.log(res);
    return {
      ...state,
      calendarEvents: [...state.calendarEvents.concat(newEvent)]
    }
    // concat allows an array of events to be added vs [...events, event(s)]

  case HIGHLIGHT_EVENT:
    console.log("highlightClickedEvent fire");

    let highlightedEvent = {};
    if (action.event) { // should recieve an event
      // console.log(action.event);
      let modifiedEvents = state.calendarEvents.map((event) => {
        if (event.id !== action.event.id) return event;
        highlightedEvent = {...event};
        let updatedEvent = {...event};
        updatedEvent.color = 'khaki';
        return updatedEvent;
      });
      // restore previously highlighted event color and update highlightedEvent
      if (state.calendarHighlightedEvent) {
          let previouslyHighlighted = {...state.calendarHighlightedEvent};
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
