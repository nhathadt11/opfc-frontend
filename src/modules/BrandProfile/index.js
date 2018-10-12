import { combineReducers } from 'redux';
import modalReducer from './reducers/modalReducer';
import mealReducer from './reducers/mealReducer';
import menuReducer from './reducers/menuReducer';
import brandReducer from './reducers/brandReducer';
import brandProfileFlow from './sagas/brandProfileSaga';

const brandProfileReducer = combineReducers({
  modal: modalReducer,
  meal: mealReducer,
  menu: menuReducer,
  brand: brandReducer,
});

export {
  brandProfileReducer,
  brandProfileFlow,
};
