const cleanState = {
  all: [],
  pagination: {
    next: '',
    previous: '',
    count: 0
  }
};

const processData = (state, action) => {
  // todo - need to change name of 'all' later
  const all = action.data
    .sort((a, b) => a.name > b.name ? 1 : -1);
  return Object.assign({}, state, { all, pagination: action.pagination });
};

const service = (state = cleanState, action) => {
  switch(action.type) {
    case 'FETCH_SERVICE_DATA_SUCCEEDED':
      return processData(state, action);
    case 'NEW_SERVICE_CREATE_SUCCEEDED':
      return cleanState;
    default:
      return state;
  }
};


export default service;
