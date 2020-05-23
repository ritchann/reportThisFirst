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

interface Props {
  originalEvent: EventType;
}

export const EditForm: React.FC<Props> = ({ originalEvent }) => {
  const dispatch = useDispatch();
  const geocode = useGeocode();

  const [httpGeocode, setHttpGeocode] = useState<httpGeocodeObject>();
  const [event, setEvent] = useState<EventType>();
  const [address, setAddress] = useState<string | undefined>(undefined);

  const options = useMemo(() => {
    return new Map<string, GeoObject>(
      httpGeocode?.GeoObjectCollection.featureMember.map((x) => [
        x.GeoObject.metaDataProperty.GeocoderMetaData.text,
        x.GeoObject,
      ])
    );
  }, [httpGeocode]);

  const onApply = useCallback(() => dispatch(updateEventAsync({ event, onResponseCallback: () => {} })), [
    dispatch,
    event,
  ]);

  useMemo(() => {
    console.log(httpGeocode?.GeoObjectCollection?.featureMember);
  }, [httpGeocode]);

  useEffect(() => {
    if (originalEvent && !httpGeocode)
      geocode([originalEvent.lat, originalEvent.lon], 'def62d81-e99f-4395-8b66-dbf1a1d64c1a', 'json').then(
        (v) => (
          setAddress(v.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text),
          setHttpGeocode(v)
        )
      );
  }, [geocode, originalEvent, httpGeocode]);

  useEffect(() => {
    if (address !== '') geocode(address, 'def62d81-e99f-4395-8b66-dbf1a1d64c1a', 'json').then((v) => setHttpGeocode(v));
  }, [geocode, address]);

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
        <Line className="fullStroke" justifyContent="between" vertical>
          <div className="label">Адрес</div>
          <SelectField
            withInput
            noWrap
            options={options}
            getLabel={(x) => x.metaDataProperty.GeocoderMetaData.text}
            value={address}
            onChange={(v) => setAddress(v)}></SelectField>
        </Line>
        <Line mt="3" className="fullStroke">
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
