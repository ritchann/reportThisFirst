import { createAction } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { Visibility } from 'data/enum';
import { EventType, FilterType, EmployeeFilterType } from 'data/event/model';

export const getEventsAsync = createAction(ActionType.EVENT_GETEVENTSASYNC);

export const setEvents = createAction<EventType[]>(ActionType.EVENT_SETEVENTS);

export const setCurrentMode = createAction<Visibility>(ActionType.EVENT_SETCURRENTMODE);

export const getAddressAsync = createAction<{
  lon: number;
  lat: number;
  onResponseCallback: (v: any) => void;
}>(ActionType.EVENT_GETADDRESSASYNC);

export const updateEventAsync = createAction<{
  event: EventType;
  onResponseCallback: () => void;
}>(ActionType.EVENT_UPDATEVENTASYNC);

export const setFilter = createAction<FilterType>(ActionType.EVENT_SETFILTER);

export const setEmployeeFilter = createAction<EmployeeFilterType>(ActionType.EVENT_SETWORKERFILTER);

export const setSelectedEmployees = createAction<number[]>(ActionType.EVENT_SETSELECTEDEMPLOYEES);
