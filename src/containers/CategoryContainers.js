import { connect } from 'react-redux';

import { List } from '../components/Category';

export const ListContainer = connect(
  state => ({
    categories: state.category.all
  })
)(List);
