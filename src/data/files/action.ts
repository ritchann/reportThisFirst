import { createAction } from 'core/redux';
import { ActionType } from 'data/actionTypes';

import { FilterType } from './model';

export const setFilter = createAction<FilterType>(ActionType.FILES_SETFILTER);

export const setSort = createAction<number>(ActionType.FILES_SETSORT);