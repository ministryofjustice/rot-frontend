import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { apiBaseURL, clientId, oAuthURL, appBaseURL } from './settings';


import root from './sagas';
import App from './components/App';
import reducer from './reducers';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    autoRehydrate()
  )
);
persistStore(store, { whitelist: ['user'] });


sagaMiddleware.run(() => root(apiBaseURL, history, clientId, oAuthURL, appBaseURL));

render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
