import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from '/imports/ui/components/App'
import '../imports/startup/accounts-config.js';

//import * as serviceWorker from './serviceWorker';
import { Tracker } from 'meteor/tracker';
import createReactiveMiddlewares from 'meteor-redux-middlewares';
// import createReactiveMiddlewares from 'meteor/samy:redux-middlewares';
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
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
