const cleanState = {
  all: [],
  newInstance: {
    name: '',
    description: '',
    parentId: '',
    errors: {}
  }
};


const processData = (state, action) => {
  const categories  = action.data
    .sort((a, b) => a.name > b.name ? 1 : -1);
  const all = categories.map(category => {
    let parent = categories.find(item => item['id'] === category['parent']);
    parent = typeof parent !== 'undefined' ? parent : new Map();
    return Object.assign({}, category, { parent });
  });
  return Object.assign({}, state, { all });
};


const handleNameChange = (state, action) => {
  const name = action.name;
  const existing = state.all.find(
    category => (
      category.name ? category.name.toLowerCase() === name.toLowerCase() : false
    )
  );
  const errMsg = typeof existing === 'undefined' ? '' : 'name already exists';
  const errors = Object.assign({}, state.newInstance.errors, { name: errMsg })
  return Object.assign({}, state, { newInstance: Object.assign({}, state.newInstance, { name, errors })});
};


const handleDescriptionChange = (state, action) => {
  const description = action.description;
  return Object.assign({}, state, { newInstance: Object.assign({}, state.newInstance, { description })});
};


const handleParentIdChange = (state, action) => {
  const parentId = action.parentId;
  return Object.assign({}, state, { newInstance: Object.assign({}, state.newInstance, { parentId }) });
};


const category = (state=cleanState,  action) => {
  switch(action.type) {
    case 'FETCH_CATEGORY_DATA_SUCCEEDED':
      return processData(state, action);
    case 'NEW_CATEGORY_NAME_CHANGED':
      return handleNameChange(state, action);
    case 'NEW_CATEGORY_DESCRIPTION_CHANGED':
      return handleDescriptionChange(state, action);
    case 'NEW_CATEGORY_PARENT_CHANGED':
      return handleParentIdChange(state, action);
    default:
      return state;
  }
};


export default category;
