import React from 'react';
calendarRef = React.createRef()

let initCal = [
    {id: '1', title: "Event Now 1", start: new Date()},
    {id: '2', title: "Event Now 2", start: new Date()},
    {id: '3', title: "5km Run", start: new Date(Date.now()+(4*60*60000)), distance: 5, category: "run" },
    {id: '4', title: "10km Run", start: new Date(Date.now()+(24*60*60000)), distance: 10, category: "run" }
  ];

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
    console.log("event drag fire");
    let e = action.calendarEvent
    let modifiedEvent = {
      id    : e.event.id,
      title : e.event.title,
      start : e.event.start,
      end : e.event.end,
      distance: e.event.distance,
      duration: e.event.duration,
      category: e.event.category
    }
    console.log(modifiedEvent);
    return [...calendarEvents.filter( (event) => {
      return event.id !== (e.event.id)
    }), modifiedEvent]
  }
  return calendarEvents;
}

export default calendarEventsReducer
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
