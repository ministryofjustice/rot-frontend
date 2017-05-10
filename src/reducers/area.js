const cleanState = {
  all: [],
  newInstance: {
    name: '',
    description: '',
    parentId: '',
    errors: {}
  }
}


const processData = (state, action) => {
  const organisations = action.data.organisations
    .sort((a, b) => a.name > b.name ? 1 : -1);
  const all = organisations.map(area => {
    let parent = organisations.find(item => item['id'] === area.parentId);
    parent = typeof parent !== 'undefined' ? parent : new Map();
    return Object.assign({}, area, { parent });
  });
  return Object.assign({}, state, { all });
}


const handleNameChange = (state, action) => {
  const name = action.name;
  const existing = state.all.find(
    area => (
      area.name ? area.name.toLowerCase() === name.toLowerCase() : false
    )
  );
  const errMsg = typeof existing === 'undefined' ? '' : 'name already exists';
  const errors = Object.assign({}, state.newInstance.errors, { name: errMsg })
  return Object.assign({}, state, { newInstance: Object.assign({}, state.newInstance, { name, errors })});
}


const handleDiscriptionChange = (state, action) => {
  const description = action.description;
  return Object.assign({}, state, { newInstance: Object.assign({}, state.newInstance, { description }) });
}


const handleParentIdChange = (state, action) => {
  const parentId = action.parentId;
  return Object.assign({}, state, { newInstance: Object.assign({}, state.newInstance, { parentId }) });
}


const handleCreateSucceed = (state, action) => {
  const newInstance = cleanState.newInstance;
  return Object.assign({}, state, { newInstance });
}


const area = (state=cleanState,  action) => {
  switch(action.type) {
    case 'FETCH_DATA_SUCCEEDED':
      return processData(state, action);
    case 'NEW_AREA_NAME_CHANGED':
      return handleNameChange(state, action);
    case 'NEW_AREA_DESCRIPTION_CHANGED':
      return handleDiscriptionChange(state, action);
    case 'NEW_AREA_PARENT_CHANGED':
      return handleParentIdChange(state, action);
    case 'NEW_AREA_CREATE_SUCCEEDED':
      return handleCreateSucceed(state, action);
    default:
      return state;
  }
}


export default area;
