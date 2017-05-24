const cleanState = {
  all: [],
  newInstance: {
    name: '',
    description: '',
    ownerId: '',
    categoryId: '',
    areaIds: [],
    errors: {}
  }
};

const processData = (state, action) => {
  const services = action.data.services
    .sort((a, b) => a.name > b.name ? 1 : -1);
  const owners = action.data.owners;
  const areas = action.data.organisations;
  const categories = action.data.categories;
  const all = services.map(service => {
    let owner = owners.find(item => item['id'] === service.ownerId);
    owner = typeof owner !== 'undefined' ? owner : new Map();
    let serviceAreas = service.areaIds.map(
      areaId => areas.find(item => item['id'] === areaId)
    );
    let category = categories.find(item => item['id'] === service.categoryId);
    category = typeof category !== 'undefined' ? category : new Map();
    return Object.assign(
      {
        areas: serviceAreas,
        category,
        owner
      },
      service
    );
  });
  return Object.assign({}, state, { all });
};


const handleNameChange = (state, action) => {
  const name = action.name;
  const existing = state.all.find(
    service => (
      service.name ? service.name.toLowerCase() === name.toLowerCase() : false
    )
  );
  const errMsg = typeof existing === 'undefined' ? '' : 'name already exists';
  const errors = Object.assign({}, state.newInstance.errors, { name: errMsg });
  const newInstance = Object.assign({}, state.newInstance, { name, errors });
  return Object.assign({}, state, {  newInstance });
};


const handleAreasChange = (state, action) => {
  const areaIds = action.areaIds;
  const newInstance = Object.assign(
    {}, state.newInstance, { areaIds });
  return Object.assign({}, state, { newInstance });
};


const handleOwnerChange = (state, action) => {
  const ownerId = action.ownerId;
  const newInstance = Object.assign(
    {}, state.newInstance, { ownerId });
  return Object.assign({}, state, { newInstance });
};


const handleCategoryChange = (state, action) => {
  const categoryId = action.categoryId;
  const newInstance = Object.assign(
    {}, state.newInstance, { categoryId });
  return Object.assign({}, state, { newInstance });
};


const handleDescriptionChange = (state, action) => {
  const description = action.description;
  const newInstance = Object.assign(
    {}, state.newInstance, { description });
  return Object.assign({}, state, { newInstance });
};


const service = (state = cleanState, action) => {
  switch(action.type) {
    case 'FETCH_DATA_SUCCEEDED':
      return processData(state, action);
    case 'NEW_SERVICE_NAME_CHANGED':
      return handleNameChange(state, action);
    case 'NEW_SERVICE_DESCRIPTION_CHANGED':
      return handleDescriptionChange(state, action);
    case 'NEW_SERVICE_AREAS_CHANGED':
      return handleAreasChange(state, action);
    case 'NEW_SERVICE_OWNER_CHANGED':
      return handleOwnerChange(state, action);
    case 'NEW_SERVICE_CATEGORY_CHANGED':
      return handleCategoryChange(state, action);
    case 'NEW_SERVICE_CREATE_SUCCEEDED':
      return state;
    default:
      return state;
  }
};


export default service;
