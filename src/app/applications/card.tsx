import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { StoreType } from 'core/store';
import { Visibility, ServiceType } from 'data/enum';
import { EventType } from 'data/event/model';
import { Button } from 'shared/base/button';
import { Line } from 'shared/base/line';
import { DateTime } from 'shared/base/utils/dateTime';
import { priority, type } from 'app/common/translations';
import { getAddressAsync } from 'data/event/action';

import { ApproveDialog } from './actions/approveDialog';
import { DeleteDialog } from './actions/deleteDialog';
import { RejectDialog } from './actions/rejectDialog';
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
      <div className="card container">
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
                <Line>
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
                <Button className="btn-outline-primary btn-sm mb-2" onClick={() => setShowApproveDialog(true)}>
                  <div className="button">Подтвердить</div>
                </Button>
              )}
              <Link to={`/edit/${event.id}`}>
                <Button className="btn-outline btn-sm mb-2 edit-button">
                  <div className="button">Изменить</div>
                </Button>
              </Link>
              <Button className="btn-outline-danger btn-sm"
                onClick={() => currentMode == Visibility.Pending ? setShowRejectDialog(true) : setShowDeleteDialog(true)}>
                <div className="button">{currentMode == Visibility.Pending ? 'Отклонить' : 'Удалить'}</div>
              </Button>
            </div>
          </Line>
        </Line>
      </div>
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
