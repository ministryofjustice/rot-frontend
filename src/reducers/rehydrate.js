import { REHYDRATE } from 'redux-persist/constants';

const rehydrate = (state = { rehydrated: false }, action) => {
  switch(action.type) {
    case REHYDRATE:
      return Object.assign({}, state, { rehydrated: true });
    default:
      return state;
  }
};

export default rehydrate;
