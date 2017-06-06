import { connect } from 'react-redux';
import { LoginLink, Login, Logout, OAuth } from '../components/Login'


export const LogInLinkContainer = connect(
  (state) => ({
    isUserLoggedIn: typeof state.user.tokens.accessToken !== 'undefined',
    loginURL: state.user.loginURL
  }),
  (dispatch) => ({
    handleLoginClick: (location) => dispatch({
      type: 'LOGIN_LINK_CLICKED',
      redirectURL: '/'
    }),
    handleLogoutClick: () => dispatch({
      type: 'LOGOUT_STARTED',
    })
  })
)(LoginLink);


export const LoginContainer = connect(
  (state) => ({
    isUserLoggedIn: typeof state.user.tokens.accessToken !== 'undefined',
    redirected: state.user.redirectURL !== '/',
    loginURL: state.user.loginURL
  }),
  (dispatch) => ({
    handleRedirectURL: (redirectURL) => dispatch({
      type: 'REDIRECT_URL_SUBMITTED',
      redirectURL
    })
  }))(Login);


export const LogoutContainer = connect(
  (state) => ({})
)(Logout);


export const OAuthContainer = connect(
  (state) => ({}),
  (dispatch) => ({
    handleCode: (code) => dispatch({
      type: 'OAUTH_CODE_SUBMITTED',
      code
    })
  })
)(OAuth);
