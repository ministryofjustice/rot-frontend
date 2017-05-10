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
  const categories  = action.data.categories
    .sort((a, b) => a.name > b.name ? 1 : -1);
  const all = categories.map(category => {
    let parent = categories.find(item => item['id'] === category.parentId);
    parent = typeof parent !== 'undefined' ? parent : new Map();
    return Object.assign({}, category, { parent });
  })
  return Object.assign({}, state, { all });
};


const category = (state=cleanState,  action) => {
  switch(action.type) {
    case 'FETCH_DATA_SUCCEEDED':
      return processData(state, action);
    default:
      return state;
  }
};


export default category;
