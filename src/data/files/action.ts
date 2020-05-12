import { createAction } from 'core/redux';
import { ActionType } from 'data/actionTypes';

import { FilterType, FileType } from './model';

export const setFiles = createAction<FileType[]>(ActionType.FILES_SETFILES);

export const setFilter = createAction<FilterType>(ActionType.FILES_SETFILTER);

export const setSort = createAction<number>(ActionType.FILES_SETSORT);