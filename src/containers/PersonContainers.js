import { connect } from 'react-redux';

import { List } from '../components/Person';


export const ListContainer = connect(
  state => ({ persons: state.persons }),
)(List);
