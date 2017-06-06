import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import area from './area';
import service from './service';
import person from './person';
import category from './category';
import user from './user';
import rehydrate from './rehydrate';


const reducer = combineReducers({
  service,
  person,
  area,
  category,
  user,
  rehydrate,
  routing: routerReducer
});

export default reducer;
