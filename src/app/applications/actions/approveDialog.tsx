import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EventType } from 'data/event/model';
import { ActionType } from 'data/actionTypes';
import { updateEventAsync } from 'data/event/action';
import { Status } from 'data/enum';
import { CancelButton } from 'shared/components';
import { LoadingButton } from 'shared/layout';
import { Modal } from 'shared/base';

interface Props {
  onClose: (needUpdate: boolean) => void;
  event: EventType;
}

export const ApproveDialog: React.FC<Props> = ({ onClose, event }) => {
  const dispatch = useDispatch();

  const onApply = useCallback(() => {
    dispatch(updateEventAsync({
      event: {
        ...event,
        status: Status.In_progress
      },
      onResponseCallback: () => onClose(true)
    }));
  }, [dispatch, event, onClose]);

  const footer = (
    <>
      <CancelButton small onClick={() => onClose(false)} />
      <LoadingButton
        actionType={ActionType.EVENT_UPDATEVENTASYNC}
        onClick={onApply}
        className="btn-primary btn-sm">
        Подтвердить
      </LoadingButton>
    </>
  );

  return (
    <Modal header="Подтверждение заявки" onCancel={() => onClose(false)} footer={footer}>
      <div className="text-modal lighter-text">Вы уверены, что хотите подтвердить заявку?</div>
    </Modal>
  );
};