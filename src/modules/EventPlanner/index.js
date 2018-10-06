import { combineReducers } from 'redux';
import eventReducer from './reducers/eventReducer';
import eventPlannerFlow from './sagas/eventPlannerSaga';

const eventPlannerReducer = combineReducers({
  event: eventReducer,
});

export {
  eventPlannerReducer,
  eventPlannerFlow,
};
