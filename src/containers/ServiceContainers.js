import { connect } from 'react-redux';

import { Create, List, Detail } from '../components/Service';


export const CreateContainer = connect(
  state => ({
    services: state.service.all,
    persons: state.persons,
    categories: state.category.all,
    newService: state.service.newInstance
  }),
  dispatch => ({
    handleCreate: (area) => dispatch({
      type: 'NEW_SERVICE_CREATE_STARTED'
    }),
    handleNameChange: (name) => dispatch({
      type: 'NEW_SERVICE_NAME_CHANGED',
      name
    }),
    handleDescriptionChange: (description) => dispatch({
      type: 'NEW_SERVICE_DESCRIPTION_CHANGED',
      description
    }),
    handleOwnerChange: (ownerId) => dispatch({
      type: 'NEW_SERVICE_OWNER_CHANGED',
      ownerId
    }),
    handleAreaChange: (areaId) => dispatch({
      type: 'NEW_SERVICE_AREA_CHANGED',
      areaId
    }),
    handleCategoryChange: (categoryId) => dispatch({
      type: 'NEW_SERVICE_CATEGORY_CHANGED',
      categoryId
    }),
    handleCreate: () => dispatch({
      type: 'NEW_SERVICE_CREATE_STARTED'
    })
  })
)(Create);


export const DetailContainer = connect(
  (state, { match }) => {
    const service = state.service.all.find(it => it.id === match.params.id);
    if (typeof service === 'undefined') {
      return {};
    }
    return service;
  }
)(Detail);


export const ListContainer = connect(
  state => ({ services: state.service.all })
)(List);
