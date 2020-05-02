import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Sort } from 'data/enum';

import { FilterType } from './model';

interface FilesInitialState {
  filter: FilterType;
  sort: number;
}

const initialState: () => FilesInitialState = () => ({
  filter: { isElectricity: false, isGas: false, isHeat: false, isWater: false },
  sort: Sort.Last
});

export const filesReducer = createReducer(initialState, {
  [ActionType.FILES_SETFILTER]: 'filter',
  [ActionType.FILES_SETSORT]: 'sort'
});
