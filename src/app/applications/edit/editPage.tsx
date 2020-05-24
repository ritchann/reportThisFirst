import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/store';
import { EventType } from 'data/event/model';
import { Page } from 'shared/layout';

import { EditForm } from './editForm';
import { EmployeePanel } from './employeePanel';

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
    <Page
      pageTitle={<div>Редактирование заявки</div>}
      pageContent={<EditForm originalEvent={event} history={(props as any).history} />}
      filterPanel={<EmployeePanel />}></Page>
  );
};
