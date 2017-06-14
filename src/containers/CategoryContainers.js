import { connect } from 'react-redux';

import { List, Detail, Create } from '../components/Category';

export const ListContainer = connect(
  state => ({
    categories: state.category.all
  })
)(List);


export const DetailContainer = connect(
  (state, { match }) => {
    const instance = state.category.all.find(it => it.id === match.params.id);
    if (typeof instance !== 'undefined') {
      const parent = state.category.all.find(it => it.id === instance.parentId);
      return Object.assign({}, instance, { parent });
    }
    return {};
  },
  dispatch => ({
    handleDelete: (id) => dispatch({
      type: 'CATEGORY_DELETE_STARTED',
      id
    })
  })
)(Detail);


export const CreateContainer = connect(
  state => ({
    categories: state.category.all,
    newCategory: state.category.newInstance
  }),
  dispatch => ({
    handleCreate: (category) => dispatch({
      type: 'NEW_CATEGORY_CREATE_STARTED'
    }),
    handleNameChange: (name) => dispatch({
      type: 'NEW_CATEGORY_NAME_CHANGED',
      name
    }),
    handleDescriptionChange: (description) => dispatch({
      type: 'NEW_CATEGORY_DESCRIPTION_CHANGED',
      description
    }),
    handleParentChange: (parentId) => dispatch({
      type: 'NEW_CATEGORY_PARENT_CHANGED',
      parentId
    })
  })
)(Create);
