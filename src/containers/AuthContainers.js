import { routerActions } from 'react-router-redux';
import { UserAuthWrapper  } from 'redux-auth-wrapper';

export const LoginRequired = UserAuthWrapper({
  authSelector: (state) => state.user,
  failureRedirectPath: '/login-required',
  authenticatingSelector: (state) => !state.rehydrate.rehydrated,
  predicate: (user) => {
    return typeof user.tokens.accessToken !== 'undefined'
  },
  redirectAction: routerActions.push,
  wrapperDisplayName: 'LoginRequired',
});



export const VisibleToAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.user,
  wrapperDisplayName: 'VisibleToAuthenticated',
  predicate: (user) => {
    return typeof user.tokens.accessToken !== 'undefined'
  },
  FailureComponent: null
})
