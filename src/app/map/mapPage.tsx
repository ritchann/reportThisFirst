import React, { useCallback, useEffect } from 'react';
import { YMaps, Map, Placemark, GeoObject, PlacemarkGeometry } from 'react-yandex-maps';
import './mapPage.scss';
import { StoreType } from 'core/store';
import { useSelector, useDispatch } from 'react-redux';
import { getEventsAsync } from 'data/event/action';
import { ServiceType } from 'data/enum';

export const MapPage: React.FC = () => {
  const mapState = { center: [56.15067, 44.206751], zoom: 12 };
  const eventsList = useSelector((state: StoreType) => state.event.eventList);

  const dispatch = useDispatch();
  const mode = useSelector((state: StoreType) => state.event.currentMode);

  const getEvents = useCallback(() => {
    dispatch(getEventsAsync(mode));
  }, [dispatch, mode]);
  useEffect(() => getEvents(), [getEvents]);
  console.log(eventsList);
  return (
    <div className="maps">
      <YMaps
        query={{
          apikey: 'def62d81-e99f-4395-8b66-dbf1a1d64c1a'
        }}>
        <Map state={mapState}>
          {eventsList.map((x, i) => (
            <GeoObject
              key={i}
              geometry={{
                type: 'Point',
                coordinates: [x.lat, x.lon]
              }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              properties={{
                iconContent: x.type,
                balloonContent: x.type,
                balloonContentFooter: `Описание: ${x.description}`
              }}
              options={{
                preset: `islands#${
                  x.type === ServiceType.Gas ? 'gray' : x.type === ServiceType.Water ? 'blue' : 'yellow'
                }StretchyIcon`
              }}></GeoObject>
          ))}
        </Map>
      </YMaps>
    </div>
  );
};
