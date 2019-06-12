let MessageId = 3

export const addWeatherData = content => {
  return {
    type: 'ADD_WEATHER_DATA',
    content
  };
  /*return {
    type: 'ADD_MESSAGE',
    id: MessageId++,
    text
  };*/
};

export const displayMessage = disp => {
  return {
    type: 'DISPLAY_MESSAGE',
    disp
  };
};

export const removeMessage = id => {
  return {
    type: 'REMOVE_MESSAGE',
    id: id
  };
};
