import { randomString } from '../utils';

const apiBaseURL = process.env.REACT_APP_API_URL
  || `http://${window.location.hostname}:3001`;
const clientId = process.env.REACT_APP_CLIENT_ID;
const oAuthURL = process.env.REACT_APP_OAUTH_URL;

const cleanState = {
  username: '',
  tokens: {},
  redirectURL: '/',
  loginURL: `${oAuthURL}/authorize/?state=random_state_string&client_id=${clientId}&response_type=code`
};


const user = (state = cleanState, action) => {
  switch(action.type) {
    case 'REDIRECT_URL_SUBMITTED':
      return Object.assign({}, state, { redirectURL: action.redirectURL });
    case 'LOGIN_LINK_CLICKED':
      return Object.assign({}, state, { redirectURL: action.redirectURL });
    case 'USER_AUTHENTICATED':
      return Object.assign({}, state, { tokens: action.tokens });
    case 'LOGOUT_SUCCEEDED':
      return Object.assign({}, state, { tokens: {}, redirectURL: '/' });
    default:
      if (state.username === '') {
        return Object.assign({}, state, {username: randomString()});
      }
      return state;
  }
};



export default user;
