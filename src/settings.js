const apiBaseURL = process.env.REACT_APP_API_URL
  || `http://${window.location.hostname}:3001`;
const clientId = process.env.REACT_APP_CLIENT_ID;
const oAuthURL = process.env.REACT_APP_OAUTH_URL;
const appBaseURL = process.env.REACT_APP_URL || `http://localhost:3000`;

const loginURL = `${oAuthURL}/authorize/?state=random_state_string&client_id=${clientId}&response_type=code`;

export {
  apiBaseURL,
  clientId,
  oAuthURL,
  appBaseURL,
  loginURL
}
