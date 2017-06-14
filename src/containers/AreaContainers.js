import { connect } from 'react-redux';

import { Create, List, Detail } from '../components/Area';


export const CreateContainer = connect(
  state => ({
    areas: state.area.all,
    newArea: state.area.newInstance
  }),
  dispatch => ({
    handleCreate: (area) => dispatch({
      type: 'NEW_AREA_CREATE_STARTED'
    }),
    handleNameChange: (name) => dispatch({
      type: 'NEW_AREA_NAME_CHANGED',
      name
    }),
    handleDescriptionChange: (description) => dispatch({
      type: 'NEW_AREA_DESCRIPTION_CHANGED',
      description
    }),
    handleParentChange: (parentId) => dispatch({
      type: 'NEW_AREA_PARENT_CHANGED',
      parentId
    })
  })
)(Create);


export const ListContainer = connect(
  state => ({ areas: state.area.all }),
)(List);


export const DetailContainer = connect(
  (state, { match }) => {
    const instance = state.area.all.find(it => it.id === match.params.id);
    if (typeof instance !== 'undefined') {
      const parent = state.area.all.find(it => it.id === instance.parentId);
      return Object.assign({}, instance, { parent });
    }
    return {};
  },
  dispatch => ({
    handleDelete: (id) => dispatch({
      type: 'AREA_DELETE_STARTED',
      id
    })
  })
)(Detail);
