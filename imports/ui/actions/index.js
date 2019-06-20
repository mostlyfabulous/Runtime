
export const addWeatherData = content => {
  return {
    type: 'ADD_WEATHER_DATA',
    content
  };
};

export const addFormData = formData => {
  return {
    type: 'ADD_RESPONSE',
    formData
  };
};

export const changePage = pageName => {
  return {
    type: 'CHANGE_PAGE',
    pageName
  };
};

export const addEvent = calendarEvent => {
  return {
    type: 'ADD_EVENT',
    calendarEvent
  };
};

export const renameEvent = (id, newName) => {
  return {
    type: 'RENAME_EVENT',
    id,
    newName
  };
};
