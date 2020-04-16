import { http } from 'core/http';
import { EventType } from 'data/event/model';
import { Visibility } from 'data/enum';

const baseUrl = 'http://spacehub.su/api';

export function getAddress(lon: number, lat: number) {
  return http.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=def62d81-e99f-4395-8b66-dbf1a1d64c1a&geocode=${lon},${lat}`);
}

export function updateEvent(event: EventType) {
  return http.patch<{ ok: boolean; data: EventType }>(
    baseUrl + `/event/${event.id}`,
    event,
    undefined,
    { "Content-Type": "application/json" }
  );
}

export function getEvents() {
  return http.get<{ ok: boolean; data: EventType[] }>(baseUrl + '/event',
    { visibility: Visibility.All });
}