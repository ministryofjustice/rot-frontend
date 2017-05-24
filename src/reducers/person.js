import { validateEmail } from '../utils';


const cleanState = {
  all: [],
  newInstance: {
    name: '',
    email: '',
    peopleFinderUrl: '',
    errors: {}
  }
};


const processData = (state, action) => {
  const all = action.data.owners
    .sort((a, b) => a.name > b.name ? 1 : -1);
  return Object.assign({}, state, { all });
};


const handleNameChange = (state, action) => {
  const name = action.name;
  const newInstance = Object.assign({}, state.newInstance, { name });
  return Object.assign({}, state, { newInstance });
};


const handleEmailChange = (state, action) => {
  const email = action.email;
  let errMsg = '';
  if (email !== '' && !validateEmail(email)) {
    errMsg = 'invalid email';
  } else {
    const existing = state.all.find(
      person => (
        person.email ? person.email.toLowerCase() === email.toLowerCase() : false
      )
    );
    errMsg = typeof existing === 'undefined' ? '' : 'email already exists';
  }
  const errors = Object.assign({}, state.newInstance.errors, { email: errMsg });
  const newInstance = Object.assign({}, state.newInstance, { email, errors });
  return Object.assign({}, state, { newInstance });
};


const handlePeopleFinderUrlChange = (state, action) => {
  const peopleFinderUrl = action.peopleFinderUrl;
  const newInstance = Object.assign({}, state.newInstance, { peopleFinderUrl });
  return Object.assign({}, state, { newInstance });
};


const handleCreateSucceed = (state, action) => {
  const newInstance = cleanState.newInstance;
  return Object.assign({}, state, { newInstance });
};


const person = (state = cleanState, action) => {
  switch(action.type) {
    case 'FETCH_DATA_SUCCEEDED':
      return processData(state, action);
    case 'NEW_PERSON_NAME_CHANGED':
      return handleNameChange(state, action);
    case 'NEW_PERSON_EMAIL_CHANGED':
      return handleEmailChange(state, action);
    case 'NEW_PERSON_CREATE_SUCCEEDED':
      return handleCreateSucceed(state, action);
    case 'NEW_PERSON_PEOPLE_FINDER_URL_CHANGED':
      return handlePeopleFinderUrlChange(state, action);
    default:
      return state;
  }
};


export default person;
