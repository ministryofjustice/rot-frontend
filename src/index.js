import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import root from './sagas';
import App from './components/App';
import reducer from './reducers';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, routerMiddleware(history))
)

const apiBaseURL = process.env.REACT_APP_API_URL
  || `http://${window.location.hostname}:3001`;
sagaMiddleware.run(() => root(apiBaseURL, history));

render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
