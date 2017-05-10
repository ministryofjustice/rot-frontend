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
}

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
}


const services = (state = cleanState, action) => {
  switch(action.type) {
    case 'FETCH_DATA_SUCCEEDED':
      return processData(state, action);
    default:
      return state;
  }
}


export default services;
