import React from 'react';
import { Route } from 'react-router-dom';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper  } from 'redux-auth-wrapper';


const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.user,
  failureRedirectPath: '/login-required',
  authenticatingSelector: (state) => !state.rehydrate.rehydrated,
  predicate: (user) => {
    return typeof user.tokens.accessToken !== 'undefined'
  },
  redirectAction: routerActions.push,
  wrapperDisplayName: 'UserIsAuthenticated',
});


const ModelRoutes = ({ path, List, Detail, Create, Update, Delete }) => (
  <div>
    <Route exact path={ `/${path}` } component={ List } />
    <Route exact path={ `/${path}/:id([a-z0-9]{17})` } component={ Detail } />
    <Route exact path={ `/${path}/new` } component={ UserIsAuthenticated(Create) } />
    <Route exact path={ `/${path}/:id([a-z0-9]+)/update` } component={ Update } />
    <Route exact path={ `/${path}/:id([a-z0-9]+)/delete` } component={ Delete } />
  </div>
);

export default ModelRoutes;
