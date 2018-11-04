import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import middlewares from './middlewares';
import { LOGOUT_ACCOUNT_SUCCESS } from './modules/Account/actions/account';

const combinedReducer = combineReducers({
  ...reducers,
});

const rootReducer = (state, action) => {
  let nextState = state;
  if (action.type === LOGOUT_ACCOUNT_SUCCESS) {
    nextState = undefined;
  }

  return combinedReducer(nextState, action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
