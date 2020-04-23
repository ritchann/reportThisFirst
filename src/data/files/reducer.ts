import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';

import { FilterType } from './model';

interface FilesInitialState {
  filter: FilterType;
}

const initialState: () => FilesInitialState = () => ({
  filter: { isElectricity: false, isGas: false, isHeat: false, isWater: false }
});

export const filesReducer = createReducer(initialState, {
  [ActionType.FILES_SETFILTER]: 'filter'
});
