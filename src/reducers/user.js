import { randomString } from '../utils';

const cleanState = {
  username: '',
  tokens: {},
  redirectURL: '/',
  loginURL: 'https://rot-dev.dsd.io/api/v1/o/authorize/?state=random_state_string&client_id=qKhUAV71zh0Bu2vhxXOew1aDGEzJNhXAXrdlbYe3&response_type=code'
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
