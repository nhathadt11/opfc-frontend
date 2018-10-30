import { combineReducers } from 'redux';
import eventReducer from './reducers/eventReducer';
import orderReducer from './reducers/orderReducer';
import eventPlannerFlow from './sagas/eventPlannerSaga';

const eventPlannerReducer = combineReducers({
  event: eventReducer,
  order: orderReducer,
});

export {
  eventPlannerReducer,
  eventPlannerFlow,
};
