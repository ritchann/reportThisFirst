import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Visibility } from 'data/enum';

import { EventType, FilterType, EmployeeFilterType } from './model';

interface EventInitialState {
  eventList: EventType[];
  currentMode: Visibility;
  filter: FilterType;
  workersFilter: EmployeeFilterType,
  selectedEmployees: number[]
}

const initialState: () => EventInitialState = () => ({
  eventList: [],
  currentMode: Visibility.Pending,
  filter: { isElectricity: false, isGas: false, isHeat: false, isWater: false },
  workersFilter: { },
  selectedEmployees: []
});

export const eventReducer = createReducer(initialState, {
  [ActionType.EVENT_SETEVENTS]: 'eventList',
  [ActionType.EVENT_SETCURRENTMODE]: 'currentMode',
  [ActionType.EVENT_SETFILTER]: 'filter',
  [ActionType.EVENT_SETWORKERFILTER]: 'workersFilter',
  [ActionType.EVENT_SETSELECTEDEMPLOYEES]: 'selectedEmployees'
});
