import { connect } from 'react-redux';

import { CreateOrUpdate, List, Detail } from '../components/Service';


function mergeServices(state) {
  return state.service.all.map(service => {
      let owner = state.person.all.find(item => item['id'] === service['owner_id']);
      owner = typeof owner !== 'undefined' ? owner : new Map();
      // todo - need to make the api return a list of ids
      let serviceAreas = [state.area.all.find(item => item['id'] === service['area_id'])];
      let category = state.category.all.find(item => item['id'] === service['category_id']);
      category = typeof category !== 'undefined' ? category : new Map();
      return Object.assign(
        {
          areas: serviceAreas,
          category,
          owner
        },
        service
      );
    })
}


export const CreateContainer = connect(
  state => ({
    services: mergeServices(state),
    persons: state.person.all,
    categories: state.category.all,
    areas: state.area.all,
    isCreate: true,
    service: {
      name: '',
      description: '',
      ownerId: '',
      categoryId: '',
      areaIds: []
    }
  }),
  dispatch => ({
    handleCreate: (service) => dispatch({
      type: 'NEW_SERVICE_CREATE_STARTED',
      service
    })
  })
)(CreateOrUpdate);


export const UpdateContainer = connect(
  (state, { match })=> {
    let service = state.service.all
      .find(it => it.id === match.params.id);
    if (typeof service === 'undefined') {
      service = {
        name: '',
        description: '',
        ownerId: '',
        categoryId: '',
        areaIds: []
      };
    }
    return {
      services: state.service.all,
      persons: state.person.all,
      categories: state.category.all,
      areas: state.area.all,
      isCreate: false,
      service
    };
  },
  dispatch => ({
    handleUpdate: ( service ) => dispatch({
      type: 'SERVICE_UPDATE_STARTED',
      service
    })
  })
)(CreateOrUpdate);


export const DetailContainer = connect(
  (state, { match }) => {
    const service = state.service.all.find(it => it.id === match.params.id);
    if (typeof service === 'undefined') {
      return {};
    }
    return service;
  },
  dispatch => ({
    handleDelete: (id) => dispatch({
      type: 'SERVICE_DELETE_STARTED',
      id
    }),
  })
)(Detail);


export const ListContainer = connect(
  state => ({
    services: mergeServices(state)
  })
)(List);
