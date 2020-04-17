import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'shared/base/line';
import { Button } from 'shared/base/button';
import { SelectField } from 'shared/fields/selectField';
import { Block } from 'shared/base/block';
import { TextBoxField } from 'shared/fields/textBoxField';
import { StoreType } from 'core/store';
import { EventType } from 'data/event/model';
import { type, status, priority } from 'app/common/translations';
import { DateInputField } from 'shared/base/dateInputField';
import { DateTime } from 'shared/base/utils/dateTime';
import { updateEventAsync } from 'data/event/action';

import { EditForm } from './editForm';
import { WorkersPanel } from './workersPanel';

import './editPage.scss';

export const EditPage: React.FC = (props) => {
  const dispatch = useDispatch();

  const events = useSelector((state: StoreType) => state.event.eventList);

  const [event, setEvent] = useState<EventType>();

  useEffect(() => {
    const id = (props as any).match.params.id;
    const e = events.find(x => x.id == id);
    setEvent(e);
  }, [props, events]);

  const onChange = useCallback((field: keyof EventType, value: boolean | Date | string) => {
    setEvent({ ...event, [field]: value });
  }, [event]);

  const onApply = useCallback(() => {
    dispatch(updateEventAsync({
      event,
      onResponseCallback: () => console.log('the end')
    }));
  }, [dispatch, event]);

  return (
    <div className="editPage">
      <div className="title">Редактирование заявки</div>
      <Line>
        <EditForm />
        <WorkersPanel />
      </Line>
      {/* <Line className="card edit" vertical>
        <Line justifyContent="between">
          <Line vertical className="card-column">
            <Line vertical mt="2" className="field">
              <div>Описание</div>
              <Block mt="1">
                <TextBoxField
                  name="Description"
                  value={event?.description}
                  onChange={(v: string) => onChange('description', v)}></TextBoxField>
              </Block>
            </Line>
            <Line vertical mt="2" className="field">
              <div>Адрес</div>
              <Block mt="1">
                <TextBoxField
                  placeholder="Район"
                  name="Region"
                  value=""
                  onChange={() => { }}></TextBoxField>
              </Block>
              <Block>
                <TextBoxField
                  placeholder="Улица"
                  name="Street"
                  value=""
                  onChange={() => { }}></TextBoxField>
              </Block>
              <Line justifyContent="between">
                <Block>
                  <TextBoxField
                    placeholder="Дом"
                    name="House"
                    value=""
                    onChange={() => { }}></TextBoxField>
                </Block>
                <Block>
                  <TextBoxField
                    placeholder="Квартира"
                    name="Apartment"
                    value=""
                    onChange={() => { }}></TextBoxField>
                </Block>
              </Line>
            </Line>
            <Line vertical mt="2" className="field">
              <div>Заявка создана</div>
              <Line mt="1">
                <DateInputField
                  disabled
                  value={event ? new Date(event.created_at) : undefined}
                  onChange={() => { }}
                ></DateInputField>
              </Line>
            </Line>
            <Line className="field" mt="2" justifyContent="between">
              <Line vertical>
                <div>Начало работы</div>
                <Line mt="1">
                  <DateInputField
                    value={event ? new Date(event.start_time) : undefined}
                    onChange={(v: Date) => onChange('start_time', DateTime.format(v, 'isodate'))}
                  ></DateInputField>
                </Line>
              </Line>
              <Line vertical>
                <div>Завершение работы</div>
                <Line mt="1">
                  <DateInputField
                    value={event ? new Date(event.deadline) : undefined}
                    onChange={(v: Date) => onChange('deadline', DateTime.format(v, 'isodate'))}
                  ></DateInputField>
                </Line>
              </Line>
            </Line>
          </Line>
          <Line vertical className="card-column">
            <Line vertical mt="2" className="field">
              <div>Тип</div>
              <Block mt="1">
                <SelectField
                  getLabel={x => x}
                  name="Type"
                  options={type}
                  value={event?.type}
                  onChange={(v: string) => onChange('type', v)}></SelectField>
              </Block>
            </Line>
            <Line vertical mt="3" className="field">
              <div>Уровень</div>
              <Block mt="1">
                <SelectField
                  getLabel={x => x}
                  name="Priority"
                  options={priority}
                  value={event?.priority}
                  onChange={(v: string) => onChange('priority', v)}></SelectField>
              </Block>
            </Line>
            <Line vertical mt="4" className="field">
              <div>Статус</div>
              <Block mt="1">
                <SelectField
                  getLabel={x => x}
                  name="Status"
                  options={status}
                  value={event?.status}
                  onChange={(v: string) => onChange('status', v)}></SelectField>
              </Block>
            </Line>
          </Line>
        </Line>
        <Line className="btns" justifyContent="end">
          <Button className="btn-outline btn-sm cancel-btn"
            onClick={() => { }}>Отменить</Button>
          <Button className="btn-outline-primary btn-sm save-btn"
            onClick={onApply}>Сохранить</Button>
        </Line>
      </Line> */}
    </div>
  );
};
