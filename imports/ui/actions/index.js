import { Meteor } from 'meteor/meteor';

import { startSubscription } from 'meteor-redux-middlewares';
import Weather from '../../api/weather.js'
import Runs from '../../api/runs.js'

let mostRecent = {};

export const WEATHER_SUBSCRIPTION_READY = 'WEATHER_SUBSCRIPTION_READY';
export const WEATHER_SUBSCRIPTION_CHANGED = 'WEATHER_SUBSCRIPTION_CHANGED';
export const WEATHER_SUB = 'weather';

export const loadWeatherEvents = () =>
// do not put console.log here, it causes a semi-cryptic error
  startSubscription({
    action: {
      type: 'START_SUBSCRIPTION'
    },
    key: WEATHER_SUB,
    get: () => Weather.find().fetch(), // find should recieve a location
    subscribe: () => Meteor.subscribe('weather'),
  });

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

export const toggleEventEditor = (toggle, calendarEvent) => {
  return {
    type: 'TOGGLE_EDITOR',
    payload: {
      toggle,
      calendarEvent
    }
  };
};

const orgainizeData = (data) => {
  console.log(data);
  let sorted = [];
  let date = null;
  let runCount = 0;

  data.forEach(function (run) {
    if (date === null || !(date.getDay() === run.start.getDay() && date.getMonth() === run.start.getMonth())){
      runCount = 0;
      date = run.start;
    }
    if (!sorted[runCount]) {
      sorted[runCount] = [run];
    }
    else {
      sorted[runCount].push(run);
    }
    runCount++;
  });
  return sorted;
}

export const getHistoryChartData = (data) => {
  console.log(data);
  return {
    type: 'GET_HISTORY',
    format: 'WEEK',
    data: orgainizeData(data)
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

// import { withTracker } from 'meteor/react-meteor-data';
//
// const AccountContext = React.createContext('account');
//
// export const withAccount = withTracker((props) => {
//   const user = Meteor.isServer ? null : Meteor.user()
//   const userId = Meteor.isServer ? null : Meteor.userId()
//   return { account: {
//     user,
//     userId,
//     isLoggedIn: !!userId
//   } }
// })
