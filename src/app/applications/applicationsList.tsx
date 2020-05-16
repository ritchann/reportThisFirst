import React, { useEffect, useCallback, useState } from 'react';
import { useSelector} from 'react-redux';
import { StoreType } from 'core/store';
import { Card } from 'app/applications/card';
import { EventType } from 'data/event/model';
import { Visibility, Status, ServiceType } from 'data/enum';
import { RepeatPanel } from 'shared/layout/repeatPanel';
import { ActionType } from 'data/actionTypes';
import { Pagination } from 'shared/components/pagination';
import { usePagination } from 'app/common/usePagination';
import { Line } from 'shared/base';

import { useApplications } from './hooks/useApplications';

const maxElements = 4;

export const ApplicationsList: React.FC = () => {
  const getApplications = useApplications(true);
  const getPages = usePagination<EventType>(maxElements);

  const { eventList: list, currentMode: mode, filter } = useSelector((state: StoreType) => state.event);

  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState<{ [page: number]: EventType[] }>({ 1: [] });
  const [maxPages, setMaxPages] = useState(1);

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
    setPages(getPages(handledResult));
    setMaxPages(Math.ceil(handledResult.length / maxElements));
    setActivePage(1);
  }, [list, mode, onHandleEvents, getPages]);

  return (
    <Line w="100" vertical>
      <RepeatPanel actionType={ActionType.EVENT_GETEVENTSASYNC} action={getApplications}>
        {pages[activePage].map((x, i) => <Card key={i} event={x} />)}
        <Pagination
          maxPages={maxPages}
          active={activePage}
          setActive={setActivePage} />
      </RepeatPanel>
    </Line>
  );
};