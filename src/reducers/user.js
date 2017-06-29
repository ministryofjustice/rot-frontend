import { randomString } from '../utils';

const cleanState = {
  username: '',
  tokens: {},
  redirectURL: '/',
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
      return cleanState;
    default:
      if (state.username === '') {
        return Object.assign({}, state, {username: randomString()});
      }
      return state;
  }
};



export default user;
