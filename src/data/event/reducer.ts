import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Visibility } from 'data/enum';

import { EventType, FilterType } from './model';

interface EventInitialState {
  eventList: EventType[];
  currentMode: Visibility;
  filter: FilterType;
  workersFilter: { isApplied: boolean }
}

const initialState: () => EventInitialState = () => ({
  eventList: [],
  currentMode: Visibility.Pending,
  filter: { isElectricity: false, isGas: false, isHeat: false, isWater: false },
  workersFilter: { isApplied: false }
});

export const eventReducer = createReducer(initialState, {
  [ActionType.EVENT_SETEVENTS]: 'eventList',
  [ActionType.EVENT_SETCURRENTMODE]: 'currentMode',
  [ActionType.EVENT_SETFILTER]: 'filter',
  [ActionType.EVENT_SETWORKERFILTER]: 'workersFilter'
});
