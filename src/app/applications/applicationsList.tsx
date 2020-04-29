import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from 'core/store';
import { Card } from 'app/applications/card';
import { Toggle } from 'app/applications/toggle';
import { EventType } from 'data/event/model';
import { Visibility, Status, ServiceType } from 'data/enum';
import { RepeatPanel } from 'shared/layout/repeatPanel';
import { ActionType } from 'data/actionTypes';

import { useApplications } from './hooks/useApplications';

import './applicationsList.scss';

export const ApplicationsList: React.FC = () => {
  const getApplications = useApplications(true);

  const { eventList: list, currentMode: mode, filter } = useSelector((state: StoreType) => state.event);

  const [events, setEvents] = useState<EventType[]>([]);

  const onHandleEvents = useCallback((events: EventType[]) => {
    const types: string[] = [];
    if (filter.isElectricity) types.push(ServiceType.Electricity);
    if (filter.isGas) types.push(ServiceType.Gas);
    if (filter.isHeat) types.push(ServiceType.Heat);
    if (filter.isWater) types.push(ServiceType.Water);

    let newEvents = [...events];
    if (filter.date) newEvents = newEvents.filter(x => x.created_at === filter.date.toString());
    if (filter.status) newEvents = newEvents.filter(x => x.status === filter.status);
    if (filter.level) newEvents = newEvents.filter(x => x.priority === filter.level);
    if (types.length > 0) newEvents = newEvents.filter(x => types.includes(x.type));
    return newEvents;
  }, [filter]);

  useEffect(() => {
    let result: EventType[] = [];
    if (list?.length > 0) {
      mode === Visibility.Pending ?
        result = list.filter(event => event.status === Status.Pending)
        :
        result = list.filter(event => event.status === Status.In_progress);
    };
    const handledResult = onHandleEvents(result);
    setEvents(handledResult);
  }, [list, mode, onHandleEvents]);

  return (
    <div className="applicationsList">
      <RepeatPanel actionType={ActionType.EVENT_GETEVENTSASYNC} action={getApplications}>
        <Toggle />
        {events.map((x, i) => <Card key={i} event={x} />)}
      </RepeatPanel>
    </div>
  );
};