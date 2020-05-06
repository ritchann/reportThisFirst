import { combineReducers } from 'redux';
import { loaderReducer } from 'core/loader';

import { eventReducer } from './event/reducer';
import { filesReducer } from './files/reducer';
import { employeeReducer } from './employee/reducer';

export const rootReducer = combineReducers({
  loader: loaderReducer,
  event: eventReducer,
  files: filesReducer,
  employee: employeeReducer
});
