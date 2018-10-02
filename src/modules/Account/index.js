import { combineReducers } from 'redux';
import account from './reducers/accountReducer';
import modal from './reducers/modalReducer';
import accountFlow from './sagas/accountSaga';

const accountReducer = combineReducers({
  account,
  modal,
});

export {
  accountReducer,
  accountFlow,
};
