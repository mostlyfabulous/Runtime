import React from 'react';
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

import {
  WEATHER_SUBSCRIPTION_READY,
  WEATHER_SUBSCRIPTION_CHANGED,
  WEATHER_SUB,
} from '../actions/index';
calendarRef = React.createRef()

const initialState = {
  weatherReady: false,
  weatherEvents: [],
  weatherSubscriptionStopped: false,
};

export function weatherReducerMiddleware(state = initialState, action) {
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


export const calendarEventsReducer = (calendarEvents, action) => {
    calendarEvents = calendarEvents || [];
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
    console.log("event drag fire");
    let e = action.calendarEvent
    console.log(e);
    let modifiedEvent = {
      id    : e.event.id,
      title : e.event.title,
      start : e.event.start,
      end : e.event.end,
      allDay: e.allDay,
      distance: e.event.extendedProps.distance,
      duration: e.event.extendedProps.duration,
      category: e.event.extendedProps.category,
      owner: e.event.extendedProps.owner,
      username: e.event.extendedProps.username,
    }

    console.log(modifiedEvent);
    return [...calendarEvents.filter( (event) => {
      return event.id !== (e.event.id)
    }), modifiedEvent]
  }
  return calendarEvents;
}
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
