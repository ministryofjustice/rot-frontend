import { connect } from 'react-redux';

import { Create, List, Detail } from '../components/Person';


export const ListContainer = connect(
  state => ({ persons: state.person.all }),
)(List);


export const DetailContainer = connect(
  (state, { match }) => {
    const instance = state.person.all.find(it => it.id === match.params.id);
    if (typeof instance === 'undefined') {
      return {};
    }
    return instance;
  },
  dispatch => ({
    handleDelete: (id) => dispatch({
      type: 'PERSON_DELETE_STARTED',
      id
    })
  })
)(Detail);


export const CreateContainer = connect(
  state => ({
    persons: state.person.all,
    newPerson: state.person.newInstance
  }),
  dispatch => ({
    handleNameChange: (name) => dispatch({
      type: 'NEW_PERSON_NAME_CHANGED',
      name
    }),
    handleEmailChange: (email) => dispatch({
      type: 'NEW_PERSON_EMAIL_CHANGED',
      email
    }),
    handlePeopleFinderUrlChange: (peopleFinderUrl) => dispatch({
      type: 'NEW_PERSON_PEOPLE_FINDER_URL_CHANGED',
      peopleFinderUrl
    }),
    handleCreate: () => dispatch({
      type: 'NEW_PERSON_CREATE_STARTED'
    })
  }),
)(Create);
