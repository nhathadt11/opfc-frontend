import { combineReducers } from 'redux';
import modalReducer from './reducers/modalReducer';

const brandProfileReducer = combineReducers({
  modal: modalReducer,
});

export {
  brandProfileReducer,
};
