import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CancelButton } from 'shared/components';
import { Line } from 'shared/base';
import { TextBoxField, SelectField, DateInputField } from 'shared/fields';
import { type, priority, status } from 'app/common/translations';
import { EventType } from 'data/event/model';
import { DateTime } from 'shared/base/utils/dateTime';
import { LoadingButton } from 'shared/layout';
import { ActionType } from 'data/actionTypes';
import { updateEventAsync } from 'data/event/action';
import { useGeocode, httpGeocodeObject, GeocoderMetaData, GeoObject } from 'shared/mapLibrary/httpGeocoding/useGeocode';
import './editForm.scss';
import { http } from 'core/http';


interface Props {
  originalEvent: EventType;
}

export const EditForm: React.FC<Props> = ({ originalEvent }) => {
  const dispatch = useDispatch();
  const geocode = useGeocode();
  const [httpGeocode, setHttpGeocode] = useState<httpGeocodeObject>();
  const [event, setEvent] = useState<EventType>();
  const [address, setAddress] = useState<string>();
  const options = useMemo(() => {
    return new Map<string, GeoObject>(httpGeocode?.GeoObjectCollection.featureMember.map(x=>[x.GeoObject.metaDataProperty.GeocoderMetaData.text, x.GeoObject]));
  }, [httpGeocode]);

  console.log(options);

  const onApply = useCallback(() => dispatch(updateEventAsync({ event, onResponseCallback: () => {} })), [
    dispatch,
    event,
  ]);

  useEffect(() => {
    geocode(address, 'def62d81-e99f-4395-8b66-dbf1a1d64c1a', 'json').then((v) => setHttpGeocode(v));
  }, [geocode,address]);

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
        <Line className="fullStroke" justifyContent="between">
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
        <Line className="fullStroke" justifyContent="between">
          <Line className="" vertical>
            <div className="label">Адрес</div>
            <SelectField withInput
              options={options}
              getLabel={x => x.metaDataProperty.GeocoderMetaData.text}
              value={address}
              onChange={(v) => setAddress(v)}></SelectField>
            <TextBoxField name="region" value={address} onChange={setAddress} placeholder="Район" />
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
          <TextBoxField
            className="workers"
            name="workers"
            value=""
            placeholder="Выберите рабочих на панели справа"
            onChange={() => {}}>
            Рабочие
          </TextBoxField>
        </Line>
        <Line justifyContent="end" mt="3">
          <CancelButton mr="2"></CancelButton>
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
