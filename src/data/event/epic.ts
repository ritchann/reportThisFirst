import { combineEpics } from 'redux-observable';
import { map, ignoreElements, tap } from 'rxjs/operators';
import { createEpic } from 'core/epic';
import {
  getEventsAsync,
  setEvents,
  getAddressAsync,
  updateEventAsync as updateEventAsync
} from 'data/event/action';
import { getEvents, getAddress, updateEvent } from 'data/event/api';

const getEventsEpic = createEpic(getEventsAsync, () => {
  return getEvents().pipe(
    map(response => {
      return setEvents(response.data);
    })
  );
});

const updateEventEpic = createEpic(updateEventAsync, data => {
  return updateEvent(data.event).pipe(
    tap(response => data.onResponseCallback()),
    ignoreElements()
  );
});

const getAddressEpic = createEpic(getAddressAsync, (data: { lon: number, lat: number, onResponseCallback: (v: any) => void }) => {
  return getAddress(data.lon, data.lat).pipe(
    map(response => {
      return data.onResponseCallback((response as any).response.GeoObjectCollection.featureMember[0].GeoObject.name);
    }),
    ignoreElements()
  );
});

export const eventEpic = combineEpics(getEventsEpic, updateEventEpic, getAddressEpic);