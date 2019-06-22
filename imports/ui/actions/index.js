let mostRecent = {};

export const addWeatherData = content => {
  return {
    type: 'ADD_WEATHER_DATA',
    content
  };
};

export const addRunData = runData => {
  return {
    type: 'ADD_RUN',
    runData
  };
};

export const changePage = pageName => {
  return {
    type: 'CHANGE_PAGE',
    pageName
  };
};

export const toggleEventEditor = toggle => {
  return {
    type: 'TOGGLE_EDITOR',
    toggle
  };
};

export const getHistoryChartData = () => {
  return {
    type: 'GET_HISTORY',
    format: 'WEEK'
  }
}

export const historyInfo = period => {
  return {
    type: 'HISTORY_INFO',
    period: period
  }
}

export const dragEvent = calendarEvent => {
  return {
    type: 'DRAG_EVENT',
    calendarEvent
  };
};

export const addEvent = calendarEvent => {
  return {
    type: 'ADD_EVENT',
    calendarEvent
  };
}

export const renameEvent = (id, newName) => {
  return {
    type: 'RENAME_EVENT',
    id,
    newName
  };
}

export const getNextRun = calendarEvents => {
  return {
    type: 'NEXT_RUN',
    calendarEvents,
    mostRecent
  };
}
