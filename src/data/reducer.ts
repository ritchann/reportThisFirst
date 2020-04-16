import { combineReducers } from 'redux';
import { loaderReducer } from 'core/loader';

import { eventReducer } from './event/reducer';

export const rootReducer = combineReducers({
  loader: loaderReducer,
  event: eventReducer
});
