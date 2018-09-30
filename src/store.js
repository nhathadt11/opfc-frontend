import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import middlewares from './middlewares';

export default createStore(
  combineReducers({
    ...reducers,
  }),
  composeWithDevTools(applyMiddleware(...middlewares)),
);
