import { connect } from 'react-redux';

import { Create, List, Detail } from '../components/Service';


export const CreateContainer = connect(
  state => ({
    services: state.service.all,
    persons: state.person.all,
    categories: state.category.all,
    areas: state.area.all,
    newService: state.service.newInstance
  }),
  dispatch => ({
    handleCreate: () => dispatch({
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
    handleAreasChange: (areaIds) => dispatch({
      type: 'NEW_SERVICE_AREAS_CHANGED',
      areaIds
    }),
    handleCategoryChange: (categoryId) => dispatch({
      type: 'NEW_SERVICE_CATEGORY_CHANGED',
      categoryId
    }),
  })
)(Create);


export const DetailContainer = connect(
  (state, { match }) => {
    const service = state.service.all.find(it => it.id === match.params.id);
    if (typeof service === 'undefined') {
      return {};
    }
    return service;
  },
  dispatch => ({
    handleEdit: (id) => dispatch({
      type: 'SERVICE_EDIT_STARTED',
      id
    }),
    handleDelete: (id) => dispatch({
      type: 'SERVICE_DELETE_STARTED',
      id
    }),
  })
)(Detail);


export const ListContainer = connect(
  state => ({ services: state.service.all })
)(List);
