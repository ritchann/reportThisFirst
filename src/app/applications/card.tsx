import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { StoreType } from 'core/store';
import { Visibility, ServiceType } from 'data/enum';
import { EventType } from 'data/event/model';
import { Line } from 'shared/base';
import { DateTime } from 'shared/base/utils/dateTime';
import { priority, type } from 'app/common/translations';
import { getAddressAsync } from 'data/event/action';
import { Card as CardContainer, EditButton, ApproveButton, DeleteButton } from 'shared/components';

import { ApproveDialog, DeleteDialog, RejectDialog } from './actions';
import { useApplications } from './hooks/useApplications';

import './card.scss';

export interface Props {
  event: EventType;
}

export const Card: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();
  const update = useApplications(false);

  const currentMode = useSelector((state: StoreType) => state.event.currentMode);

  const [address, setAddress] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  useEffect(() => {
    dispatch(getAddressAsync({
      lon: event.lon,
      lat: event.lat,
      onResponseCallback: (v: any) => setAddress(v)
    }, `${event.lon}${event.lat}`));
  }, [dispatch, event.lat, event.lon]);

  return (
    <>
      <CardContainer>
        <Line className="card-body">
          <Line vertical mt="3" ml="2">
            <Line className="header" alignItems="baseline">
              <div className={classnames('label', {
                gas: event.type == ServiceType.Gas,
                electricity: event.type == ServiceType.Electricity,
                water: event.type == ServiceType.Water,
                heat: event.type == ServiceType.Heat
              })}></div>
              <div className="title bolder-text">{type.get(event.type)}</div>
            </Line>
            <Line mt="2">
              <Line vertical className="left-column">
                <div className="lighter-text">{DateTime.format(new Date(event.created_at))}</div>
                <Line mt="1">
                  <div>Адрес: </div>
                  <div className="lighter-text pl-1">{address}</div>
                </Line>
              </Line>
              <Line vertical>
                <Line>
                  <div>Уровень: </div>
                  <div className="lighter-text pl-1">{priority.get(event.priority)}</div>
                </Line>
                <div className="mt-1">
                  Описание: <span className="lighter-text pl-1">{event.description}</span>
                </div>
              </Line>
            </Line>
          </Line>
          <Line className="col-sm card-column buttons" vertical alignItems="end" mt="3">
            <div className="mt-1">
              {currentMode == Visibility.Pending && (
                <ApproveButton small mb="2" onClick={() => setShowApproveDialog(true)} />
              )}
              <Link to={`/edit/${event.id}`}>
                <EditButton small mb="2" />
              </Link>
              <DeleteButton
                small
                onClick={() => currentMode == Visibility.Pending ? setShowRejectDialog(true) : setShowDeleteDialog(true)}
                isReject={currentMode == Visibility.Pending}
                mb="2"
              />
            </div>
          </Line>
        </Line>
      </CardContainer>
      {showApproveDialog && <ApproveDialog
        onClose={(needUpdate: boolean) => {
          setShowApproveDialog(false);
          if (needUpdate) update();
        }}
        event={event} />}
      {showDeleteDialog && <DeleteDialog
        onClose={(needUpdate: boolean) => {
          setShowDeleteDialog(false);
          if (needUpdate) update();
        }}
        event={event} />}
      {showRejectDialog && <RejectDialog
        onClose={(needUpdate: boolean) => {
          setShowRejectDialog(false);
          if (needUpdate) update();
        }}
        event={event} />}
    </>
  );
};
