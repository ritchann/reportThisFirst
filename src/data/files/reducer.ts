import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Sort } from 'data/enum';

import { FilterType, FileType } from './model';

interface FilesInitialState {
  files: FileType[],
  filter: FilterType;
  sort: number;
}

const initialState: () => FilesInitialState = () => ({
  files: [],
  filter: { isElectricity: false, isGas: false, isHeat: false, isWater: false },
  sort: Sort.Last
});

export const filesReducer = createReducer(initialState, {
  [ActionType.FILES_SETFILES]: 'files',
  [ActionType.FILES_SETFILTER]: 'filter',
  [ActionType.FILES_SETSORT]: 'sort'
});
