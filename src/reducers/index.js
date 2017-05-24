import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import area from './area';
import service from './service';
import person from './person';
import category from './category';


const reducer = combineReducers({
  service,
  person,
  area,
  category,
  routing: routerReducer
});

export default reducer;
