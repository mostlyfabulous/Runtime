import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from '/imports/ui/components/App'
import '../imports/startup/accounts-config.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Tracker } from 'meteor/tracker';
import createReactiveMiddlewares from 'meteor-redux-middlewares';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '/imports/ui/reducers';
import { render } from 'react-dom';

const {
  sources,
  subscriptions,
} = createReactiveMiddlewares(Tracker);


  Meteor.startup(() => {
    render(<Provider store={createStore(reducers, compose(
      applyMiddleware(sources, subscriptions, /*logger*/),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f)

    )}>
  		<App />
  	</Provider>, document.getElementById('react-target'));
  });
