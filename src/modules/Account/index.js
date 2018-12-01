import { combineReducers } from 'redux';
import account from './reducers/accountReducer';
import modal from './reducers/modalReducer';
import notification from './reducers/notificationReducer';
import bookmark from './reducers/bookmarkReducer';
import accountFlow from './sagas/accountSaga';

const accountReducer = combineReducers({
  account,
  modal,
  notification,
  bookmark,
});

export {
  accountReducer,
  accountFlow,
};
