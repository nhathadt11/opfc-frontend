import { combineReducers } from 'redux';
import modalReducer from './reducers/modalReducer';
import mealReducer from './reducers/mealReducer';
import brandProfileFlow from './sagas/brandProfileSaga';

const brandProfileReducer = combineReducers({
  modal: modalReducer,
  meal: mealReducer,
});

export {
  brandProfileReducer,
  brandProfileFlow,
};
