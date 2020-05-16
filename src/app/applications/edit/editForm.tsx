import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CancelButton } from 'shared/components';
import { Line } from 'shared/base';
import { TextBoxField, SelectField, DateInputField } from 'shared/fields';
import { type, priority, status } from 'app/common/translations';
import { EventType } from 'data/event/model';
import { DateTime } from 'shared/base/utils/dateTime';
import { LoadingButton } from 'shared/layout';
import { ActionType } from 'data/actionTypes';
import { updateEventAsync } from 'data/event/action';
import { StoreType } from 'core/store';

import './editForm.scss';

interface Props {
  originalEvent: EventType;
  history: any;
}

export const EditForm: React.FC<Props> = ({ originalEvent, history }) => {
  const dispatch = useDispatch();
  const [event, setEvent] = useState<EventType>();

  const selectedEmployees = useSelector((state: StoreType) => state.event.selectedEmployees);
  const allEmployees = useSelector((state: StoreType) => state.employee.employees);

  const selected = useMemo(() => {
    const result: string[] = [];
    selectedEmployees.forEach((id) => {
      const employee = allEmployees.find((employee) => employee.id === id);
      if (employee)
        result.push(
          `${employee.lastname} ${employee.firstname[0].toUpperCase()}. ${employee.patronymic[0].toUpperCase()}.`
        );
    });
    return result.join(', ');
  }, [selectedEmployees, allEmployees]);

  const onApply = useCallback(() => {
    dispatch(updateEventAsync({ event, onResponseCallback: () => history.push('/') }));
  }, [dispatch, event, history]);

  useEffect(() => setEvent(originalEvent), [originalEvent]);

  return (
    <Card className="editForm">
      <Line vertical className="fullStroke">
        <Line className="fullStroke">
          <TextBoxField
            className="description"
            name="description"
            value={event?.description}
            onChange={(description) => setEvent({ ...event, description })}>
            Описание
          </TextBoxField>
        </Line>
        <Line className="fullStroke" justifyContent="between">
          <SelectField
            className="field"
            value={event?.type}
            label="Тип"
            options={type}
            getLabel={(x) => x}
            onChange={(type) => setEvent({ ...event, type })}></SelectField>
          <SelectField
            className="field"
            value={event?.priority}
            label="Уровень"
            options={priority}
            getLabel={(x) => x}
            onChange={(priority) => setEvent({ ...event, priority })}></SelectField>
        </Line>
        <Line className="fullStroke" justifyContent="between" mt="2">
          <SelectField
            className="field"
            value={event?.status}
            label="Статус"
            options={status}
            getLabel={(x) => x}
            onChange={(status) => setEvent({ ...event, status })}></SelectField>
          <Line className="field" vertical>
            <div className="label">Заявка создана</div>
            <DateInputField value={event ? new Date(event.created_at) : undefined} onChange={() => {}} disabled />
          </Line>
        </Line>
        <Line className="fullStroke" justifyContent="between" mt="2">
          <Line className="field" vertical>
            <div className="label">Начало работы</div>
            <DateInputField
              value={event ? new Date(event.start_time) : undefined}
              onChange={(v: Date) => setEvent({ ...event, start_time: DateTime.format(v, 'isodate') })}
            />
          </Line>
          <Line className="field" vertical>
            <div className="label">Завершение работы</div>
            <DateInputField
              value={event ? new Date(event.deadline) : undefined}
              onChange={(v: Date) => setEvent({ ...event, deadline: DateTime.format(v, 'isodate') })}
            />
          </Line>
        </Line>
        <Line className="fullStroke" justifyContent="between" mt="2">
          <Line className="field" vertical>
            <div className="label">Адрес</div>
            <TextBoxField name="region" value="" onChange={() => {}} placeholder="Район" />
          </Line>
          <Line className="field address" vertical>
            <TextBoxField name="house" value="" onChange={() => {}} placeholder="Дом" />
          </Line>
        </Line>
        <Line className="fullStroke" justifyContent="between" mt="1">
          <Line className="field" vertical>
            <TextBoxField name="street" value="" onChange={() => {}} placeholder="Улица" />
          </Line>
          <Line className="field" vertical>
            <TextBoxField name="apartment" value="" onChange={() => {}} placeholder="Квартира" />
          </Line>
        </Line>
        <Line className="fullStroke">
          <TextBoxField className="employees" name="employees" value={selected} onChange={() => {}}>
            Выберите рабочих на панели справа
          </TextBoxField>
        </Line>
        <Line justifyContent="end" mt="3">
          <CancelButton mr="2" onClick={() => history.push('/')}></CancelButton>
          <LoadingButton
            className="btn-outline-primary"
            actionType={ActionType.EVENT_UPDATEVENTASYNC}
            onClick={onApply}>
            Подтвердить
          </LoadingButton>
        </Line>
      </Line>
    </Card>
  );
};
