import { combineReducers } from 'redux';
import account from './reducers/accountReducer';
import modal from './reducers/modalReducer';
import notification from './reducers/notificationReducer';
import accountFlow from './sagas/accountSaga';

const accountReducer = combineReducers({
  account,
  modal,
  notification,
});

export {
  accountReducer,
  accountFlow,
};
