export function findIndexofEvent(calendarEvents, e) {
  return targetID = calendarEvents.findIndex(function (event) {
    return e.id === event.id;
  });
}

export function filterOutEvent(calendarEvents, e) {
  return calendarEvents.filter(function (event) {
    return e.id !== event.id;
  });
}
