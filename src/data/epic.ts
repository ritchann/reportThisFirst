import { combineEpics } from 'redux-observable';

import { eventEpic } from './event/epic';

export const rootEpic = combineEpics(eventEpic);
