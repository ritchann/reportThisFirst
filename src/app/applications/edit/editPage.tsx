import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'shared/base';
import { StoreType } from 'core/store';
import { EventType } from 'data/event/model';

import { EditForm } from './editForm';
import { WorkersPanel } from './workersPanel';

import './editPage.scss';

export const EditPage: React.FC = (props) => {
  const events = useSelector((state: StoreType) => state.event.eventList);

  const [event, setEvent] = useState<EventType>();

  useEffect(() => {
    const id = (props as any).match.params.id;
    const e = events.find((x) => x.id == id);
    setEvent(e);
  }, [props, events]);

  return (
    <div className="editPage">
      <Line className="title">Редактирование заявки</Line>
      <Line>
        <EditForm originalEvent={event} />
        <WorkersPanel />
      </Line>
    </div>
  );
};
