import { connect } from 'react-redux';

import { CreateOrUpdate, List, Detail } from '../components/Service';


function mergeServices(state) {
  return state.service.all.map(service => {
      let owner = state.person.all.find(item => item['id'] === service['owner_id']);
      owner = typeof owner !== 'undefined' ? owner : {};

      const areas = service.areas.map(areaId => {
        return state.area.all.find(a => a['id'] === areaId);
      });

      const categories = service.categories.map(categoryId => {
        let category = state.category.all.find(cat => cat['id'] === categoryId)
        category = typeof category !== 'undefined' ? category : {};
        return category
      });

      return Object.assign(
        service,
        {
          areaObjects: areas,
          categoryObjects: categories,
          owner
        }
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
      owner_id: '',
      categories: [],
      areas: [],
      catgegoryObjects: [],
      areaObjects: []
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
    const allServices = mergeServices(state);
    let service = allServices.find(it => it.id === Number.parseInt(match.params.id, 10));
    if (typeof service === 'undefined') {
      service = {
        name: '',
        description: '',
        owner_id: '',
        categories: [],
        areas: [],
        catgegoryObjects: [],
        areaObjects: []
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
    const allServices = mergeServices(state);
    const service = allServices.find(it => it.id === Number.parseInt(match.params.id, 10));
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
    services: mergeServices(state),
    areas: state.area.all,
    categories: state.category.all
  })
)(List);
