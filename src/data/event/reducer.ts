import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Visibility } from 'data/enum';

import { EventType, FilterType } from './model';

interface EventInitialState {
  eventList: EventType[];
  currentMode: Visibility;
  filter: FilterType;
}

const initialState: () => EventInitialState = () => ({
  eventList: [],
  currentMode: Visibility.Pending,
  filter: { isElectricity: false, isGas: false, isHeat: false, isWater: false }
});

export const eventReducer = createReducer(initialState, {
  [ActionType.EVENT_SETEVENTS]: 'eventList',
  [ActionType.EVENT_SETCURRENTMODE]: 'currentMode',
  [ActionType.EVENT_SETFILTER]: 'filter'
});
