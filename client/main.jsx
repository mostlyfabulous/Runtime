import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from '/imports/ui/App'
//import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '/imports/ui/reducers';
import { render } from 'react-dom';


  Meteor.startup(() => {
    render(<Provider store={createStore(reducers)}>
  		<App />
  	</Provider>, document.getElementById('react-target'));
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

/*
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App'

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});
*/
