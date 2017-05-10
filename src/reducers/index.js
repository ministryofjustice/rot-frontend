import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import area from './area';
import service from './service';
import persons from './person';
import category from './category';


const reducer = combineReducers({
  service,
  persons,
  area,
  category,
  routing: routerReducer
});

export default reducer;
