import { Meteor } from 'meteor/meteor';
import React from 'react';
import { findIndexofEvent, filterOutEvent } from '../../utils/calendarUtils'
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

import {
  PREFERENCES_SUBSCRIPTION_READY,
  PREFERENCES_SUBSCRIPTION_CHANGED,
  PREFERENCES_SUB,
  EDIT_PREFERENCES
} from '../actions/index';

const initialPreferencesState = {
  preferencesReady: false,
  preferencesEvents: [],
  preferencesSubscriptionStopped: false,
};

//export function preferencesrReducerMiddleware(state = initialPreferencesState, action) {
export function preferencesEventsReducer(state = initialPreferencesState, action) {
  switch (action.type) {
    case PREFERENCES_SUBSCRIPTION_READY:
    // console.log('preferences ready - reducer');
    // console.log(state.preferencesEvents);
      return {
        ...state,
        preferencesReady: action.payload.ready,
      };
    case PREFERENCES_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        preferencesEvents: action.payload,
      };
    case STOP_SUBSCRIPTION: // currently don't need to stop a sub
      return action.payload === PREFERENCES_SUB
        ? { ...state, preferencesSubscriptionStopped: true }
        : state;
    case EDIT_PREFERENCES:
          let edit = action.preferences;
          // console.log("edit preferences - reducer");
          // console.log(edit);
          const resUpdate = Meteor.call('preferences.editPreferences', edit);
          return { ...state,
            edit
          }
          // Preferences.update({_id: Meteor.user()._id}, edit, function (err, docsChanged) {
          //   if (err) console.log(err);
          // })
          // console.log('state in edit reducer')
          // console.log(state)
          // // preferencesEvents: []
          // return { ...state,
          //   edit
          // };

    default:
      return state;
  }
}
