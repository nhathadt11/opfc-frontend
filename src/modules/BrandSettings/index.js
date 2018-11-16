import { combineReducers } from 'redux';
import serviceLocation from './reducers/serviceLocationReducer';
import brandInformation from './reducers/brandInformationReducer';

import settingsSagaFlow from './sagas/settingsSaga';

const settingsReducer = combineReducers({
  serviceLocation,
  brandInformation,
});

export {
  settingsReducer,
  settingsSagaFlow,
};
