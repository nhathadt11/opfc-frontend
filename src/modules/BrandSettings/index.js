import { combineReducers } from 'redux';
import serviceLocation from './reducers/serviceLocationReducer';

import settingsSagaFlow from './sagas/settingsSaga';

const settingsReducer = combineReducers({
  serviceLocation,
});

export {
  settingsReducer,
  settingsSagaFlow,
};
