import { combineReducers } from 'redux';
import modalReducer from './reducers/modalReducer';
import mealReducer from './reducers/mealReducer';
import menuReducer from './reducers/menuReducer';
import brandReducer from './reducers/brandReducer';
import brandProfileFlow from './sagas/brandProfileSaga';
import orderReducer from './reducers/orderReducer';

const brandProfileReducer = combineReducers({
  modal: modalReducer,
  meal: mealReducer,
  menu: menuReducer,
  brand: brandReducer,
  order: orderReducer,
});

export {
  brandProfileReducer,
  brandProfileFlow,
};
