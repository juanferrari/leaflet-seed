import React from 'react';
import ReactDOM from 'react-dom';
import App from 'views/main/App2';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import reducer_reminders from 'reducers/reducer_reminder';
import css from './index.css';
import L from 'leaflet';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer_reminders, composeEnhancers(
    applyMiddleware(thunk)
  ));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
	 document.getElementById('app'))
